import React from "react";

function LandingPage({ setRoom, checkName, joinRoom, room, user }) {
  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col">
      <div className="flex flex-col items-center  rounded h-1/3  justify-center">
        <h1 className="text-4xl font-bold mb-2">JOIN THE CHAT</h1>
        <input
          type="text"
          placeholder="Room..."
          className="p-2 mb-2 border-solid border-cyan-300 border-2 w-full h-10 rounded-lg focus:bg-cyan-100 hover:bg-cyan-200"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Your name.."
          className="p-2 mb-2 border-solid border-cyan-300 border-2 w-full h-10 rounded-lg focus:bg-cyan-100 hover:bg-cyan-200"
          value={user}
          onChange={(e) => {
            checkName(e.target.value);
          }}
        />
        <button
          onClick={joinRoom}
          className="flex justify-center items-center font-medium p-2 mb-2 border-solid bg-cyan-300 border-2 w-full h-10 rounded-lg hover:bg-cyan-400 text-white"
        >
          Join room
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
