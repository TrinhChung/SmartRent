import db from "../models/index";
const { Op } = require("sequelize");

export const getRoomChatService = async (id) => {
  const roomChat = await db.RoomChat.findOne({
    where: { id: id },
    include: [
      { model: db.Contract, as: "contract" },
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
    contractId: data.contractId,
  });
  return roomChat;
};

export const getRoomChatForMeService = async (userId) => {
  try {
    const roomChats = await db.RoomChat.findAll({
      include: [
        {
          model: db.Contract,
          where: {
            [Op.or]: [{ sellerId: userId }, { renterId: userId }],
          },
          include: [
            {
              model: db.RealEstate,
              attributes: ["name"],
              include: [
                {
                  model: db.File,
                  where: {
                    typeFk: "2",
                  },
                  required: false,
                  as: "realEstateFiles",
                  attributes: ["url"],
                },
              ],
              required: true,
            },
          ],
          as: "contract",
        },
      ],
      order: [["createdAt", "DESC"]],
      subQuery: false,
    });
    return roomChats;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
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
