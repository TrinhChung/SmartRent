const users = {};

const eventSocket = (socket) => {
  eventRoom(socket);
  socket.on("login", (userId) => {
    console.log("user-login " + userId);
    users[Number(userId)] = socket.id;
    socket.on("disconnect", () => {
      console.log("disconnect " + userId);
      delete users[Number(userId)];
    });
    console.log(users);
  });
};

const sendNotification = (data) => {
  console.log(data);
  console.log(users[Number(data.userId)]);
  global.io.to(users[Number(data.userId)]).emit("notification", data);
};

const sendMessage = (socket, roomId) => {
  socket.on("message", (message) => {
    console.log(message);
    io.to(roomId).emit("newMessage", message);
  });
};

const disconnect = (socket, userId, roomId) => {
  socket.on("disconnect", () => {
    console.log("user disconnected" + userId);
    socket.to(roomId).emit("user-disconnected", userId);
  });
};

const joinRoom = (socket, userId, roomId) => {
  socket.join(roomId);
  socket.to(roomId).emit("user-connected", userId);
  console.log("send-id user connected");
};

const eventRoom = (socket) => {
  socket.emit("connect-success", "connect-success");
  socket.on("join-room", (roomId, userId) => {
    console.log("user-joined-room", userId);
    joinRoom(socket, userId, roomId);
    sendMessage(socket, roomId);
    disconnect(socket, userId, roomId);
  });
};

module.exports = {
  eventSocket: eventSocket,
  sendNotification: sendNotification,
};
