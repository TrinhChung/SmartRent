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
        status: "1",
      },
      { transaction: transaction }
    );

    var realEstate = await db.RealEstate.findOne({
      where: { id: data.realEstateId },
    });
    realEstate = realEstate.get({ plain: true });

    const roomChat = await db.RoomChat.create(
      {
        bargainId: bargain.id,
        name: realEstate.name,
      },
      { transaction: transaction }
    );

    const sm = await db.SmartContract.create({}, { transaction: transaction });

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
      where: {
        status: ["1", "3", "4"],
        renterId: userId,
        realEstateId: realEstateId,
      },
      subQuery: false,
    });
    if (bargains?.length > 0) {
      return true;
    }

    console.log(bargains);
    return false;
  } catch (error) {
    console.log(error);
    throw new Error("find Bargain by userId Failed", error);
  }
};

export const closeBargainService = async (userId, bargainId) => {
  try {
    var bargain = await db.Bargain.findOne({
      where: { id: bargainId },
      include: [
        {
          model: db.RealEstate,
          required: true,
        },
      ],
    });
    if (!bargain) {
      throw new Error("Hợp đồng không tồn tại");
    }
    if (
      bargain.get({ plain: true }).renterId !== userId &&
      bargain.get({ plain: true }).sellerId !== userId
    ) {
      throw new Error("Bạn không có quyền thay đổi trạng thái hợp đồng");
    }
    if (userId !== bargain) bargain.update({ status: "5" });
  } catch (error) {
    console.log(error);
    throw new Error("Close bargain id fail", error);
  }
};

export const getBargainService = async ({ userId, page = 1, limit = 10 }) => {
  try {
    const total = await db.Bargain.count({
      where: { [Op.or]: [{ sellerId: userId }, { renterId: userId }] },
    });

    var bargains = await db.Bargain.findAll(
      {
        where: { [Op.or]: [{ sellerId: userId }, { renterId: userId }] },
        include: [
          {
            model: db.RealEstate,
            required: true,
            include: [
              {
                model: db.File,
                where: {
                  typeFk: "2",
                },
                limit: 1,
                as: "realEstateFiles",
                attributes: ["url"],
                required: true,
              },
              { model: db.Address, required: true },
            ],
          },
          {
            model: db.RoomChat,
            required: true,
          },
        ],
        offset: (page - 1) * limit,
        subQuery: false,
        limit: limit,
      },
      { raw: true }
    );

    return { total: total, bargains: bargains };
  } catch (error) {
    console.log(error);
    throw new Error("Get bargain id fail", error);
  }
};
