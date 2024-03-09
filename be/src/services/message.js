import { sendNotifyToRoom, sendNotification } from "../controllers/socket";
import db from "../models/index";
import { createFileService } from "./file";
import { createNotifyService } from "./notify";

const getNewMessages = async (data) => {
  try {
    var message = await db.Message.findAll({
      where: {
        id: data.id,
        roomChatId: data.roomChatId,
      },
      include: [
        {
          model: db.File,
          where: {
            typeFk: "1",
          },
          as: "messageFiles",
          attributes: ["url"],
          required: false,
        },
      ],
    });
    return message;
  } catch (error) {
    console.log("Get new message error");
  }
};

export const createMessageService = async (data) => {
  const transaction = await db.sequelize.transaction();
  var room = await db.RoomChat.findOne({
    where: { id: data.roomChatId },
    include: [
      {
        model: db.Contract,
        as: "contract",
      },
    ],
  });

  room = room.get({ plain: true });

  if (!room) {
    throw new Error("Room Chat không tồn tại");
  }
  if (!room.contract) {
    throw new Error("Hợp đồng không tồn tại");
  }
  if (room.contract.status === "5" || room.contract.status === "6") {
    throw new Error("Hợp đồng đã đóng");
  }

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

    const newMessage = await getNewMessages(message);
    const receiver =
      data.userId === room.contract.renterId
        ? room.contract.sellerId
        : room.contract.renterId;
    await createNotifyService(
      {
        userId: receiver,
        fkId: data.roomChatId,
        content: `Bạn có tin nhắn mới từ ${room.name}`,
        type: "1",
        eventNotify: "notify-message",
      },
      transaction
    );

    await transaction.commit();
    await sendNotification(receiver, "new-message");
    await sendNotifyToRoom(data, newMessage);
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
      include: [
        {
          model: db.File,
          where: {
            typeFk: "1",
          },
          as: "messageFiles",
          attributes: ["url"],
          required: false,
        },
      ],
    });
    return messages;
  } catch (error) {
    console.log(error);
    throw new Error("Get message service error", error);
  }
};
