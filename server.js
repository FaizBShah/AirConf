const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log("Connected");
  socket.emit("message", "Connected");

  socket.on('disconnect', () => {
    console.log("Disonnected");
    io.emit("message", "Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));