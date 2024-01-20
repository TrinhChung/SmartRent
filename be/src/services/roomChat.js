import db from "../models/index";

export const getRoomChatService = async (id) => {
  const roomChat = await db.RoomChat.findOne({ where: { id: id } });
  if (roomChat) {
    return roomChat;
  } else {
    throw new Error("Couldn't find room chat for " + id);
  }
};

export const createRoomChatService = async (data) => {
  const roomChat = await db.RoomChat.create({
    bargainId: data.bargainId,
  });
  return roomChat;
};
