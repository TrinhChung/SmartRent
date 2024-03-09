import db from "../models/index";
import { sendNotifyCloseContractToRoom } from "../controllers/socket";
import { createNotifyService } from "./notify";
const { Op } = require("sequelize");

export const createContractService = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    var realEstate = await db.RealEstate.findOne({
      where: { id: data.realEstateId },
    });
    realEstate = realEstate.get({ plain: true });

    const contract = await db.Contract.create(
      {
        realEstateId: data.realEstateId,
        renterId: data.renterId,
        sellerId: data.sellerId,
        renterCost: realEstate.cost,
        timeStart: realEstate.timeStart,
        paymentType: realEstate.paymentType,
        renterCost: realEstate.cost,
        status: "1",
      },
      { transaction: transaction }
    );

    const roomChat = await db.RoomChat.create(
      {
        contractId: contract.id,
        name: realEstate.name,
      },
      { transaction: transaction }
    );

    await transaction.commit();

    return roomChat.get({ plain: true });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("Create Contract Failed", error);
  }
};

export const checkContractIsExistService = async ({ userId, realEstateId }) => {
  try {
    var contracts = await db.Contract.findAll({
      where: {
        status: ["1", "2", "3", "4"],
        renterId: userId,
        realEstateId: realEstateId,
      },
      subQuery: false,
    });
    if (contracts?.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw new Error("Không tìm thấy hợp đồng", error);
  }
};

export const closeContractService = async (userId, contractId) => {
  const transaction = await db.sequelize.transaction();
  try {
    var contract = await db.Contract.findOne({
      where: { id: contractId },
      include: [
        {
          model: db.RealEstate,
          required: true,
        },
      ],
    });
    if (!contract) {
      throw new Error("Hợp đồng không tồn tại");
    }
    if (
      contract.get({ plain: true }).renterId !== userId &&
      contract.get({ plain: true }).sellerId !== userId
    ) {
      throw new Error("Bạn không có quyền thay đổi trạng thái hợp đồng");
    }
    await contract.update({ status: "5" });

    const room = await db.RoomChat.findOne({ contractId: contract.id });
    const receiver =
      userId === contract.renterId ? contract.sellerId : contract.renterId;

    await createNotifyService(
      {
        userId: receiver,
        fkId: room.id,
        content: `Đối phương đã hủy đàm phán ${room.name}`,
        type: "2",
        eventNotify: "close-contract",
      },
      transaction
    );

    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("Close contract id fail", error);
  }
};

export const getContractService = async ({ userId, page = 1, limit = 10 }) => {
  try {
    const total = await db.Contract.count({
      where: { [Op.or]: [{ sellerId: userId }, { renterId: userId }] },
    });

    var contracts = await db.Contract.findAll(
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

    return { total: total, contracts: contracts };
  } catch (error) {
    console.log(error);
    throw new Error("Get contract id fail", error);
  }
};
