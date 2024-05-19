import db from "../models/index";
import { logger } from "../cron-job/logger";
const { Op } = require("sequelize");

export const getUserPaymentDeadline = async () => {
  const data = isLastDayOfMonth();
  console.log(data);
  logger.info(data);

  try {
    const contractHasDeadline = await db.Contract.findAll({
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
          model: db.User,
          as: "renter",
          attributes: ["email", "id", "wallet"],
        },
      ],
      attributes: ["realEstateId", "id"],
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
