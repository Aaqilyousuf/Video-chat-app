import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";

const Notification = () => {
  const { call, answerCall, callAccepted } = useContext(SocketContext);
  return (
    <>
      <p className="text-lg text-blue-700 font-normal">Notification:</p>
      {call.isReceived && !callAccepted && (
        <div className="flex justify-around">
          <h1 className="text-lg font-bold">{call.name} is calling: </h1>
          <button
            className="p-2 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-200"
            onClick={answerCall}
          >
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notification;
