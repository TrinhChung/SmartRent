import db from "../models/index";
const { Op } = require("sequelize");

export const createBargainService = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    var bargain = await db.Bargain.create(
      {
        sellerId: data.sellerId,
        renterId: data.renterId,
        realEstateId: data.realEstateId,
        status: data.status,
      },
      { transaction: transaction }
    );

    const roomChat = await db.RoomChat.create(
      {
        bargainId: bargain.id,
        name: "Phòng đàm phán",
      },
      { transaction: transaction }
    );

    transaction.commit();

    return roomChat.get({ plain: true });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("Create Bargain Failed", error);
  }
};

export const checkBargainIsExistService = async ({ userId, realEstateId }) => {
  try {
    var bargains = await db.Bargain.findAll({
      where: { renterId: userId, realEstateId: realEstateId },
      include: [
        {
          model: db.RealEstate,
          where: {
            status: ["1", "2"],
          },
          required: true,
          attributes: ["id"],
        },
      ],
    });

    if (bargains?.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw new Error("find Bargain by userId Failed", error);
  }
};
