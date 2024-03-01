const users = {};

export const eventSocket = (socket) => {
  eventRoom(socket);
  socket.on("login", (userId) => {
    console.log("user-login " + userId);
    users[Number(userId)] = socket.id;
    socket.on("disconnect", () => {
      console.log("disconnect " + userId);
      delete users[Number(userId)];
    });
  });
};

export const sendNotification = (data) => {
  // console.log(data);
  // console.log(users[Number(data.userId)]);
  global.io.emit("notification", data);
};

export const sendNotifyToRoom = (data,newMessage) => {
  global.io.to(data.roomChatId).emit("new-message", data.userId, newMessage);
};

const sendMessage = (socket, roomId) => {
  socket.on("message", (message) => {
    console.log("new message");
    io.to(roomId).emit("newMessage", message);
  });
};

const disconnect = (socket, userId, roomId) => {
  socket.on("disconnect", () => {
    console.log("user disconnected" + userId);
    socket.to(roomId).emit("user-disconnected", userId);
  });
};

const senNotifyJoinRoom = (socket, userId, roomId) => {
  socket.join(roomId);
  socket.to(roomId).emit("user-connected", userId);
  console.log(`user ${userId} joined room ${roomId}`);
};

const eventRoom = (socket) => {
  socket.emit("connect-success", "connect-success");
  const eventInRoom = (roomId, userId) => {
    senNotifyJoinRoom(socket, userId, roomId);
    sendMessage(socket, roomId);
    disconnect(socket, userId, roomId);
  };
  socket.on("join-room", eventInRoom);
  socket.on("leave-room", (userId, roomId) => {
    socket.leave("room" + roomId);
    console.log(`User ${userId} out room ${roomId}`);
  });
};
