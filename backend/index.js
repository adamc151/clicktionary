const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4001;
var rooms = [];

io.on("connection", (socket) => {
  console.log("yoooo server connection");
  socket.on("joinroom", function (room) {
    socket.join(room);

    const currentRoom = rooms.findIndex((x) => x.name === room);
    if (currentRoom > -1) {
      rooms[currentRoom].clients.push(socket.id);
    } else {
      rooms.push({ name: room, clients: [socket.id] });
    }

    const index = currentRoom === -1 ? rooms.length - 1 : currentRoom;
    console.log("yoooo rooms", rooms);

    if (rooms[index].clients.length === 1) {
      rooms[index].activeClient = socket.id;
      io.to(room).emit("setactive", true);
      io.to(room).emit("setplayer2ready", false);
    } else if (rooms[index].clients.length === 2) {
      io.to(room).emit("setplayer2ready", true);
    }
  });

  socket.on("message", (msg) => {
    const { roomName } = getRoom(socket.id);
    io.to(roomName).emit("message", msg);
  });
  socket.on("startTimer", (msg) => {
    const { roomName } = getRoom(socket.id);
    io.to(roomName).emit("startTimer", msg);
  });
  socket.on("addPoint", (msg) => {
    const { roomName } = getRoom(socket.id);
    io.to(roomName).emit("addPoint", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected id", socket.id);

    const { roomIndex, clientIndex } = getRoom(socket.id);
    rooms[roomIndex].clients.splice(clientIndex, 1);
    const roomName = rooms[roomIndex].name;
    const numOfClients = rooms[roomIndex].clients.length;

    if (numOfClients === 1) {
      rooms[roomIndex].activeClient = socket.id;
      io.to(roomName).emit("setactive", true);
      io.to(roomName).emit("setplayer2ready", false);
    } else if (numOfClients === 2) {
      io.to(roomName).emit("setplayer2ready", true);
    } else if (numOfClients === 0) {
      rooms.splice(roomIndex, 1);
    }
  });
});

getRoom = (id) => {
  let roomIndex, clientIndex, roomName;
  rooms.map((a, roomIdx) => {
    a.clients.map((b, clientIdx) => {
      if (b === id) {
        roomIndex = roomIdx;
        roomName = a.name;
        clientIndex = clientIdx;
        return;
      }
    });
  });

  return {
    roomIndex,
    roomName,
    clientIndex,
  };
};

server.listen(port, () => console.log(`Listening on port ${port}`));
