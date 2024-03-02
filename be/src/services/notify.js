import db from "../models";
const { Op } = require("sequelize");

export const getUserNotification = async (id) => {
    const notifyUnRead = await db.Notify.findAll({
        where: {
            userId: {
              [Op.eq]: id
            },
            isRead: false,
          }
    });
    const notifyRead = await db.Notify.findAll({
        where: {
            userId: {
              [Op.eq]: id
            },
            isRead: true,
          }
    });
    return {notifyUnRead: notifyUnRead, notifyRead: notifyRead};
};

export const upsertMessageNotify = async (data) => {
    try {
        const [instance, created] = await db.Notify.upsert(
            {
                userId: data.userId,
                fkId: data.fkId,
                isRead: data.isRead,
                content: data.content,
                type: data.type,
            },
            { 
                userId: data.userId,
                fkId: data.fkId,
                type: data.type,
            }
          );
          return {instance: instance, created: created};
    } catch (error) {
        console.log(error);
        throw new Error("Change read state error", error);
    }
}