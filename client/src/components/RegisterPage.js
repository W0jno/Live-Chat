import React from "react";
import { Link } from "react-router-dom";
function RegisterPage() {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen flex-col">
        <div className="flex flex-col items-center  rounded h-1/3  justify-center">
          <h1 className="text-4xl font-bold mb-2">REGISTER</h1>
          <input
            type="text"
            placeholder="Your name..."
            className="p-2 mb-2 border-solid border-cyan-300 border-2 w-full h-10 rounded-lg focus:bg-cyan-100 hover:bg-cyan-200"
          />

          <input
            type="text"
            placeholder="Password..."
            className="p-2 mb-2 border-solid border-cyan-300 border-2 w-full h-10 rounded-lg focus:bg-cyan-100 hover:bg-cyan-200"
          />
          <input
            type="text"
            placeholder="Repeat password..."
            className="p-2 mb-2 border-solid border-cyan-300 border-2 w-full h-10 rounded-lg focus:bg-cyan-100 hover:bg-cyan-200"
          />
          <Link
            to={`/`}
            className="p-2 mb-2  h-10 rounded-lg   hover:text-cyan-500"
          >
            Already have an account? Login here!
          </Link>
          <Link
            to={`/roomList`}
            className="flex justify-center items-center font-medium p-2 mb-2 border-solid bg-cyan-300 border-2 w-full h-10 rounded-lg hover:bg-cyan-400 text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
