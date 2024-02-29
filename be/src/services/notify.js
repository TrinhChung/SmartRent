import db from "../models";
const { Op } = require("sequelize");

export const getUserNotification = async (id) => {
    const notify = await db.Notify.findAll({
        where: {
            userId: {
              [Op.eq]: id
            }
          }
    });
    return notify;
};

export const creatNotification = async (data) => {
    const notify = await db.Notify.create({
        userId: data.userId,
        fkId: data.fkId,
        content: data.content,
        type: data.type,
    });
    return notify;
}

export const changeNotifyReadStateService = async (data) => {
    try {
        await db.Notify.update({ isRead: true }, {
            where : {
                userId: data.userId,
                fkId: data.fkId,
                isRead: false,
                type: data.type,
            }});
    } catch (error) {
        console.log(error);
        throw new Error("Change read state error", error);
    }
}