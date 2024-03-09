import db from "../models";
import { sendNotification } from "../controllers/socket";

export const getUserNotification = async (userId) => {
  const notifyUnRead = await db.Notify.findAll({
    where: {
      userId: userId,
      isRead: false,
    },
  });
  const notifyRead = await db.Notify.findAll({
    where: {
      userId: userId,
      isRead: true,
    },
  });
  return { notifyUnRead: notifyUnRead, notifyRead: notifyRead };
};

export const createNotifyService = async (
  { userId, fkId, content, type, eventNotify },
  transaction
) => {
  try {
    const notify = await db.Notify.create(
      {
        userId: userId,
        fkId: fkId,
        isRead: false,
        content: content,
        type: type,
      },
      { transaction: transaction }
    );
    sendNotification(userId, eventNotify);
    return notify.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("Change read state error", error);
  }
};

export const readNotifyService = async (notifyId) => {
  try {
    let notify = await db.Notify.findByPk(notifyId);
    if (!notify) {
      throw new Error("Thông báo không tồn tại");
    }
    console.log(notify);
    await notify.update({ isRead: true });
  } catch (error) {
    console.log(error);
    throw new Error("Change read state error", error);
  }
};
