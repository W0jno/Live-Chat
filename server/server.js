const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const fs = require("fs");

app.use(cors());

app.use(express.static(path.join(__dirname, "client/public")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("join-room", (room, user) => {
    socket.join(room);
    console.log(`User ${user} joined room: ${room}`);
  });

  socket.on("send-message", (data) => {
    socket.to(data.room).emit("recieve-message", data);
  });
});

server.listen(3001, () => {
  console.log("listening on 3001");
});
