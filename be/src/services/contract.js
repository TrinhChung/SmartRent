import db from "../models/index";
import { createNotifyService } from "./notify";
import { senNotifyUpdateTerm } from "../controllers/socket";
import { createTermCost, createTermTimeStart, createTermFixed } from "./term";
import { createContractInstanceSMC } from "../config/connectSMC";

const { Op } = require("sequelize");

export const createContractService = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    var realEstate = await db.RealEstate.findOne({
      where: { id: data.realEstateId },
      include: [{ model: db.Address, required: true }],
    });
    realEstate = realEstate.get({ plain: true });

    if (!realEstate) {
      return res
        .status(400)
        .json({ message: "Bất động sản này không còn tồn tại!" });
    }

    if (realEstate.status !== "1") {
      return res
        .status(400)
        .json({ message: "Bất động sản này đã được người khác thuê" });
    }

    const contract = await db.Contract.create(
      {
        realEstateId: data.realEstateId,
        renterId: data.renterId,
        sellerId: data.sellerId,
        paymentType: "Etherum",
        status: "3",
      },
      { transaction: transaction }
    );

    // create term cost and deposit
    await createTermCost({
      contractId: contract.id,
      value: realEstate.cost,
      addressRe: realEstate.Address.address,
      transaction: transaction,
      userId: data.sellerId,
    });

    // create term time start and deadline
    await createTermTimeStart({
      contractId: contract.id,
      value: new Date(),
      transaction: transaction,
      userId: data.sellerId,
    });

    await createTermFixed({
      contractId: contract.id,
      userId: data.sellerId,
      transaction: transaction,
    });

    const roomChat = await db.RoomChat.create(
      {
        contractId: contract.id,
        name: realEstate.name,
      },
      { transaction: transaction }
    );

    await createNotifyService(
      {
        userId: data.sellerId,
        fkId: roomChat.id,
        content: `Bạn có phòng đàm phán mới ${roomChat.name}`,
        type: "3",
        eventNotify: "new-contract",
      },
      transaction
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
        status: {
          [Op.notIn]: ["1", "2"],
        },
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
    await contract.update({ status: "1" });

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

    await senNotifyUpdateTerm(
      {
        roomChatId: room.id,
        userId: receiver,
      },
      "update-term"
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

export const getContractByIdService = async ({ id }) => {
  try {
    var contract = await db.Contract.findOne({
      where: { id: id },
      include: [
        {
          model: db.RealEstate,
          include: [{ model: db.Address, required: false }],
          required: true,
        },
        {
          model: db.Term,
          required: true,
          include: [
            {
              model: db.Contradiction,
              required: false,
              attributes: ["id", "termId", "targetId"],
            },
          ],
        },
        {
          model: db.User,
          required: true,
          include: [
            { model: db.Address, required: false },
            { model: db.Signature, required: false },
          ],
          attributes: { exclude: ["password"] },
          as: "renter",
        },
        {
          model: db.User,
          required: true,
          include: [
            { model: db.Address, required: false },
            { model: db.Signature, required: false },
          ],
          attributes: { exclude: ["password"] },
          as: "seller",
        },
      ],
    });
    if (!contract) {
      throw new Error("Hợp đồng không tồn tại");
    }
    return contract.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("Get contract id fail", error);
  }
};

export const signContractService = async ({ contractId, userId }) => {
  const transaction = await db.sequelize.transaction();
  try {
    var contract = await db.Contract.findOne({
      where: { id: contractId },
      include: [
        {
          model: db.RoomChat,
          required: true,
        },
      ],
    });

    const contractData = contract.get({ plain: true });
    if (userId !== contractData.renterId) {
      throw new Error("Bạn không có quyền thay đổi trạng thái ký kết");
    }
    if (contractData.status !== "3") {
      throw new Error("Thao tác không hợp lệ");
    }

    await contract.update({ status: "7" });

    await createNotifyService(
      {
        userId: contractData.sellerId,
        fkId: contractData?.RoomChat?.id,
        content: `Người thuê đã ký hợp đồng vui lòng tạo hợp đồng`,
        type: "2",
        eventNotify: "sign-contract",
      },
      transaction
    );

    await senNotifyUpdateTerm(
      {
        roomChatId: contractData?.RoomChat?.id,
        userId: contractData.sellerId,
      },
      "update-term"
    );

    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error.message, error);
  }
};

export const createSmartContractService = async ({ contractId, contractCid, userId }) => {
  const transaction = await db.sequelize.transaction();
  try {
    var contract = await db.Contract.findOne({
      where: { id: contractId },
      include: [
        {
          model: db.RoomChat,
          required: true,
        },
      ],
    });
    var contractData = contract.get({ plain: true });

    if (userId !== contractData.sellerId) {
      throw new Error("Bạn không có quyền thay đổi trạng thái ký kết");
    }

    if (contractData.status !== "7") {
      throw new Error("Thao tác không hợp lệ");
    }

    await contract.update({ status: "8", cid: contractCid }, { transaction: transaction });

    await createNotifyService(
      {
        userId: contractData.renterId,
        fkId: contractData?.RoomChat?.id,
        content: `Người bán đã tạo hợp đồng thông minh`,
        type: "2",
        eventNotify: "sign-contract",
      },
      transaction
    );

    await transaction.commit();

    await senNotifyUpdateTerm(
      {
        roomChatId: contractData?.RoomChat?.id,
        userId: contractData.renterId,
      },
      "update-term"
    );
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("sign contract fail", error);
  }
};

export const renterPaymentSmartContractService = async ({
  contractId,
  userId,
}) => {
  const transaction = await db.sequelize.transaction();
  try {
    const contract = await db.Contract.findOne({
      where: { id: contractId },
      include: [
        {
          model: db.RoomChat,
          required: true,
        },
        {
          model: db.User,
          required: true,
          attributes: ["wallet"],
          as: "renter",
        },
      ],
    });
    const contractData = contract.get({ plain: true });

    if (userId !== contractData.renterId) {
      throw new Error("Bạn không có quyền thay đổi trạng thái ký kết");
    }

    if (contractData.status !== "8") {
      throw new Error("Thao tác không hợp lệ");
    }
    const scInstance = createContractInstanceSMC(process.env.CONTRACT_ADDRESS);

    const depositRenter = await scInstance.getDepositContractByRenter(
      contractData?.id,
      contractData?.renter.wallet
    );

    if (Number(depositRenter) > 0) {
      await contract.update({ status: "4" }, { transaction: transaction });

      await createNotifyService(
        {
          userId: contractData.renterId,
          fkId: contractData?.RoomChat?.id,
          content: `Người thuê đã thanh toán cọc của hợp đồng`,
          type: "2",
          eventNotify: "sign-contract",
        },
        transaction
      );

      await senNotifyUpdateTerm(
        {
          roomChatId: contractData?.RoomChat?.id,
          userId: contractData.renterId,
        },
        "update-term"
      );
    } else {
      throw new Error("Bạn chưa đặt cọc cho hợp đồng");
    }

    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("renter payment smart contract", error);
  }
};
