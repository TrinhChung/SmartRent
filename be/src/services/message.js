import { sendNotifyToRoom } from "../controllers/socket";
import db from "../models/index";

export const createMessageService = async (data) => {
  try {
    const message = await db.Message.create({
      userId: data.userId,
      content: data.content,
      roomChatId: data.roomChatId,
    });

    sendNotifyToRoom(data.roomChatId);

    return message.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("Create message service error", error);
  }
};

export const getMessagesOfRoomChatService = async (data) => {
  try {
    const messages = await db.Message.findAll({
      where: { roomChatId: data.roomChatId },
    });
    return messages;
  } catch (error) {
    console.log(error);
    throw new Error("Get message service error", error);
  }
};
