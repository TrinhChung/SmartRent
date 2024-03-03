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
    console.log(users);
  });
};

export const sendNotification = async (userId) => {
  console.log(users[Number(userId)]);
  console.log("send notification " + userId);
  await global.io
    .to(users[Number(userId)])
    .emit("notification", { data: "new message" });
};

export const sendNotifyToRoom = async (data, newMessage) => {
  await global.io.to(data.roomChatId).emit("new-message", data.userId);
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
    disconnect(socket, userId, roomId);
  };
  socket.on("join-room", eventInRoom);
  socket.on("leave-room", (roomId, userId) => {
    socket.leave("room" + roomId);
    console.log(`User ${userId} out room ${roomId}`);
  });
};
