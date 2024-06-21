import db from "../models/index";
import { logger } from "../cron-job/logger";
const { Op } = require("sequelize");

export const getUserPaymentDeadline = async () => {
  const data = isLastDayOfMonth();

  try {
    const contractHasDeadline = await db.Contract.findAll({
      where: {
        status: "4",
        duration: { [Op.gt]: 0 },
      },
      include: [
        {
          model: db.Term,
          where: {
            type: "deadline",
            value: { [Op.in]: data },
          },
          attributes: ["type"],
        },
        {
          model: db.RoomChat,
          required: true,
        },
        {
          model: db.User,
          required: true,
          attributes: ["email", "id", "wallet"],
          as: "renter",
        },
        {
          model: db.User,
          required: true,
          attributes: ["email", "id", "wallet"],
          as: "seller",
        },
      ],
      attributes: ["realEstateId", "id", "sellerId", "renterId"],
    });

    return contractHasDeadline;
  } catch (error) {
    logger.error(`Get user paymet deadline: ${error}`);
  }
};

const isLastDayOfMonth = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const lastDay = new Date(year, month + 1, 0).getDate();

  if (today.getDate() === lastDay) {
    return Array.from({ length: 31 - today.getDate() + 1 }, (_, i) => {
      const day = today.getDate() + i;
      return `${day}`;
    });
  } else {
    const day = today.getDate();
    return [`${day}`];
  }
};
