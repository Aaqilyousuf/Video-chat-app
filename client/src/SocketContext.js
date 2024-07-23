import { useContext, useRef, useState, useEffect, createContext } from "react";
import React from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });
    socket.on("me", (id) => setMe(id));

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceived: true, from, name: callerName, signal });
    });
  }, []);

  useEffect(() => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (userVideo.current && callAccepted) {
      userVideo.current.srcObject = stream;
    }
  }, [callAccepted, stream]);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    try {
      peer.on("signal", (data) => {
        socket.emit("answercall", { signal: data, to: call.from });
      });
      peer.on("stream", (currentStream) => {
        console.log(currentStream);
        userVideo.current.srcObject = currentStream;
      });
      console.log(userVideo);
      peer.signal(call.signal);
      connectionRef.current = peer;
    } catch (err) {
      alert("Disconnected");
    }
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    try {
      peer.on("signal", (data) => {
        socket.emit("calluser", {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
      });
      peer.on("stream", (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
      socket.on("callaccepted", (signal) => {
        setCallAccepted(true);

        peer.signal(signal);
      });
      connectionRef.current = peer;
    } catch (err) {
      alert("Disconnected");
    }
  };
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        callEnded,
        myVideo,
        stream,
        userVideo,
        name,
        setName,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
