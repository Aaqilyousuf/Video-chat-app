import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";

const VideoPlayer = () => {
  const { myVideo, userVideo, callAccepted, callEnded, name, call } =
    useContext(SocketContext);

  return (
    <div className="flex justify-between items-center h-[70%] p-4">
      {/* My Video */}
      <div
        className={`relative w-full max-w-[550px] ${
          callAccepted && !callEnded ? "order-1" : "mx-auto"
        }`}
      >
        <div className="absolute top-0 left-0 bg-gray-800 text-white p-2 rounded-t-lg">
          {name || "My Video"}
        </div>
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          className="w-full h-[400px] rounded-lg border border-gray-300 shadow-md"
        />
      </div>

      {/* User Video */}
      {callAccepted && !callEnded && (
        <div className="relative w-full max-w-[550px] order-2">
          <div className="absolute top-0 left-0 bg-gray-800 text-white p-2 rounded-t-lg">
            {call.name || "User Video"}
          </div>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className="w-full h-[400px] rounded-lg border border-gray-300 shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
