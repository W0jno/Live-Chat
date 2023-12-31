import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import Photo from "./components/Photo.js";
import LandingPage from "./components/LandingPage.js";
const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const checkName = (name) => {
    if (name.length < 30) {
      setUser(name);
    } else {
      alert("Please enter shorter name");
      setUser("");
    }
  };
  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join-room", room, user);
      setShowChat(true);

      navigate(`/room/${room}`);
    }
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            joinRoom={joinRoom}
            checkName={checkName}
            setRoom={setRoom}
            room={room}
            user={user}
          />
        }
      />
      <Route
        path="room/:id"
        element={<Chat socket={socket} room={room} user={user} />}
      />
    </Routes>
  );
}

export default App;
