import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorComponent from "./ErrorComponent";

function RegisterPage({ setPassword, password, username, setUsername }) {
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const registerHandle = () => {
    if (password == "" || username == "" || repeatedPassword == "") {
      setIsError(true);
      setErrorMessage("Please enter all data");
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    } else if (password != repeatedPassword) {
      setIsError(true);
      setErrorMessage("Passwords are not identical");
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    } else {
      navigate(`/rooms`);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen flex-col">
        <div className="flex flex-col items-center  rounded h-1/3  justify-center">
          <h1 className="text-4xl font-bold mb-2">REGISTER</h1>
          <input
            type="text"
            placeholder="Your name..."
            className="p-2 mb-2 border-solid border-cyan-300 border-2 w-full h-10 rounded-lg focus:bg-cyan-100 hover:bg-cyan-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password..."
            className="p-2 mb-2 border-solid border-cyan-300 border-2 w-full h-10 rounded-lg focus:bg-cyan-100 hover:bg-cyan-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Repeat password..."
            className="p-2 mb-2 border-solid border-cyan-300 border-2 w-full h-10 rounded-lg focus:bg-cyan-100 hover:bg-cyan-200"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
          />
          {isError ? <ErrorComponent text={errorMessage} /> : ""}
          <Link
            to={`/`}
            className="p-2 mb-2  h-10 rounded-lg   hover:text-cyan-500"
          >
            Already have an account? Login here!
          </Link>
          <button
            className="flex justify-center items-center font-medium p-2 mb-2 border-solid bg-cyan-300 border-2 w-full h-10 rounded-lg hover:bg-cyan-400 text-white"
            onClick={registerHandle}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
