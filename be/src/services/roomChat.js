import db from "../models/index";
const { Op } = require("sequelize");

export const getRoomChatService = async (id) => {
  const roomChat = await db.RoomChat.findOne({
    where: { id: id },
    include: [
      { model: db.Bargain, as: "bargain" },
      { model: db.Message, as: "messages" },
    ],
  });
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

export const getRoomChatForMeService = async (userId) => {
  const roomChats = await db.RoomChat.findAll({
    include: [
      {
        model: db.Bargain,
        as: "bargain",
        where: {
          [Op.or]: [{ sellerId: userId }, { renterId: userId }],
        },
      },
    ],
  });
  return roomChats;
};

export const changeNameRoomChatService = async ({ roomChatId, name }) => {
  try {
    const roomChat = await db.RoomChat.findOne({
      where: { id: roomChatId },
    });

    const newRoom = await roomChat.update({ name: name });
    return newRoom;
  } catch (error) {
    console.log(error);
    throw new Error("Change name room chat service error", error);
  }
};
