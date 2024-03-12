import db from "../models/index";
import { createNotifyService } from "./notify";

export const createTermService = async ({ value, contractId, userId }) => {
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
    contract = contract.get({ plain: true });

    await db.Term.create(
      {
        content: value,
        contractId: contractId,
        accept: "0",
        userId: userId,
      },
      { transaction: transaction }
    );

    const receiver =
      contract?.sellerId === userId ? contract?.renterId : contract?.sellerId;

    await createNotifyService(
      {
        userId: receiver,
        fkId: contract?.RoomChat?.id,
        content: "Đối tác của bạn vừa thêm 1 điều khoản mới vào hợp đồng",
        type: "4",
        eventNotify: "update-term",
      },
      transaction
    );

    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};

export const updateTermService = async ({ accept, termId, userId }) => {
  const transaction = await db.sequelize.transaction();

  try {
    const term = await db.Term.findOne({
      where: { id: termId },
      include: [
        {
          model: db.Contract,
          include: [
            {
              model: db.RoomChat,
              required: true,
            },
          ],
        },
      ],
    });
    if (term?.dataValues && term?.dataValues.Contract) {
      const termData = term.get({ plain: true });
      const ownerId =
        termData.Contract.sellerId === term.userId
          ? termData.Contract.renterId
          : termData.Contract.sellerId;
      if (ownerId !== userId) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await term.update({ accept: accept }, { transaction: transaction });

      await createNotifyService(
        {
          userId: term.userId,
          fkId: term?.Contract?.RoomChat?.id,
          content: "Đối tác đã chấp nhận điều khoản của bạn",
          type: "5",
          eventNotify: "update-term",
        },
        transaction
      );

      await transaction.commit();
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};

export const updateValueCostTermService = async ({ value, costId, userId }) => {
  const transaction = await db.sequelize.transaction();

  try {
    const cost = await db.Cost.findOne({
      where: { id: costId },
      include: [
        {
          model: db.Contract,
          include: [
            {
              model: db.RoomChat,
              required: true,
            },
          ],
        },
      ],
    });

    if (cost?.dataValues && cost?.dataValues.Contract) {
      const costData = cost.get({ plain: true });
      if (
        costData.Contract.sellerId !== userId &&
        costData.Contract.renterId !== userId
      ) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await cost.update(
        { value: value, accept: false, userId: userId },
        { transaction: transaction }
      );
      const ownerId =
        costData.Contract.sellerId === userId
          ? costData.Contract.renterId
          : costData.Contract.sellerId;

      await createNotifyService(
        {
          userId: ownerId,
          fkId: costData?.Contract?.RoomChat?.id,
          content: "Đối tác của bạn đã chỉnh lại giá thuê",
          type: "6",
          eventNotify: "update-term",
        },
        transaction
      );

      await transaction.commit();
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};

export const updateAcceptCostTermService = async ({
  accept,
  costId,
  userId,
}) => {
  const transaction = await db.sequelize.transaction();

  try {
    const cost = await db.Cost.findOne({
      where: { id: costId },
      include: [
        {
          model: db.Contract,
          include: [
            {
              model: db.RoomChat,
              required: true,
            },
          ],
        },
      ],
    });
    if (cost?.dataValues && cost?.dataValues.Contract) {
      const costData = cost.get({ plain: true });
      const ownerId =
        costData.Contract.sellerId === costData.userId
          ? costData.Contract.renterId
          : costData.Contract.sellerId;
      if (ownerId !== userId) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await cost.update({ accept: accept }, { transaction: transaction });

      await createNotifyService(
        {
          userId: costData.userId,
          fkId: costData?.Contract?.RoomChat?.id,
          content: "Đối tác của bạn đã chấp thuận giá mới",
          type: "7",
          eventNotify: "update-term",
        },
        transaction
      );

      await transaction.commit();
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};

export const updateValueTimeStartTermService = async ({
  value,
  timeStartId,
  userId,
}) => {
  const transaction = await db.sequelize.transaction();

  try {
    const timeStart = await db.TimeStart.findOne({
      where: { id: timeStartId },
      include: [
        {
          model: db.Contract,
          include: [
            {
              model: db.RoomChat,
              required: true,
            },
          ],
        },
      ],
    });
    if (timeStart?.dataValues && timeStart?.dataValues.Contract) {
      const timeStartData = timeStart.get({ plain: true });
      if (
        timeStartData.Contract.sellerId !== userId &&
        timeStartData.Contract.renterId !== userId
      ) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await timeStart.update(
        { value: value, accept: false, userId: userId },
        { transaction: transaction }
      );

      const ownerId =
        timeStartData.Contract.sellerId === userId
          ? timeStartData.Contract.renterId
          : timeStartData.Contract.sellerId;

      await createNotifyService(
        {
          userId: ownerId,
          fkId: timeStartData?.Contract?.RoomChat?.id,
          content: "Đối tác của bạn đã chỉnh lại thời gian hợp đồng bắt đầu",
          type: "8",
          eventNotify: "update-term",
        },
        transaction
      );

      await transaction.commit();
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};

export const updateAcceptTimeStartTermService = async ({
  accept,
  timeStartId,
  userId,
}) => {
  const transaction = await db.sequelize.transaction();

  try {
    const timeStart = await db.TimeStart.findOne({
      where: { id: timeStartId },
      include: [
        {
          model: db.Contract,
          include: [
            {
              model: db.RoomChat,
              required: true,
            },
          ],
        },
      ],
    });
    if (timeStart?.dataValues && timeStart?.dataValues.Contract) {
      const timeStartData = timeStart.get({ plain: true });
      const ownerId =
        timeStartData.Contract.sellerId === timeStartData.userId
          ? timeStartData.Contract.renterId
          : timeStartData.Contract.sellerId;
      if (ownerId !== userId) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await timeStart.update({ accept: accept }, { transaction: transaction });

      await createNotifyService(
        {
          userId: timeStartData.userId,
          fkId: timeStartData?.Contract?.RoomChat?.id,
          content: "Đối tác của bạn đã chỉnh lại thời gian hợp đồng bắt đầu",
          type: "9",
          eventNotify: "update-term",
        },
        transaction
      );
      await transaction.commit();
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};
