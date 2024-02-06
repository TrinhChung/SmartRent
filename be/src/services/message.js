import { sendNotifyToRoom } from "../controllers/socket";
import db from "../models/index";
import { createFileService } from "./file";

export const createMessageService = async (data) => {
  const transaction = await db.sequelize.transaction();

  try {
    var message = await db.Message.create(
      {
        userId: data.userId,
        content: data.content,
        roomChatId: data.roomChatId,
      },
      transaction
    );

    if (data.files.length > 0) {
      message = message.get({ plain: true });
      await createFileService(
        {
          fkId: message.id,
          files: data.files,
        },
        "1",
        transaction
      );
    }

    sendNotifyToRoom(data.roomChatId);
    await transaction.commit();

    return message;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("Create message service error", error);
  }
};

export const getMessagesOfRoomChatService = async (data) => {
  try {
    const messages = await db.Message.findAll({
      where: { roomChatId: data.roomChatId },
      include: [{ model: db.File, as: "messageFiles", attributes: ["url"] }],
    });
    return messages;
  } catch (error) {
    console.log(error);
    throw new Error("Get message service error", error);
  }
};
