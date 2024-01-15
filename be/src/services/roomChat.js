import db from "../models/index";

let getRoomChatService = async (id) => {
  const roomChat = await db.RoomChat.findOne({ id: id });
  return roomChat;
};

module.exports = {
  getRoomChatService: getRoomChatService,
};
