import React, { useState, useContext } from "react";
import { SocketContext } from "../SocketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex flex-wrap justify-between gap-6 mb-6">
          {/* Account Info */}
          <div className="flex-1 min-w-[300px] max-w-sm">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Account Info
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <CopyToClipboard text={me}>
              <button className="w-full p-2 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-200">
                Copy Your ID
              </button>
            </CopyToClipboard>
          </div>

          {/* Make a Call */}
          <div className="flex-1 min-w-[300px] max-w-sm">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Make a Call
            </h2>
            <input
              type="text"
              placeholder="ID to call"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            {callAccepted && !callEnded ? (
              <button
                className="w-full p-2 bg-red-500 text-white rounded-md flex items-center justify-center hover:bg-red-600 transition duration-200"
                onClick={leaveCall}
              >
                Hang Up
              </button>
            ) : (
              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-200"
                onClick={() => callUser(idToCall)}
              >
                Call
              </button>
            )}
          </div>
        </div>

        {/* Include children below Options */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Options;
