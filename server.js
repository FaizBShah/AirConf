const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*'
  }
});

const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peerjs', peerServer);

io.on('connection', (socket) => {
  console.log("Connected");
  socket.emit("message", "Connected");

  socket.on("join-room", (roomId, id, username) => {
    console.log(roomId, id, username);
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", id, username);
  });

  socket.on('disconnect', () => {
    console.log("Disonnected");
    io.emit("message", "Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));