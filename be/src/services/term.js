import db from "../models/index";

export const createTermService = async ({ value, contractId, userId }) => {
  try {
    await db.Term.create({
      content: value,
      contractId: contractId,
      accept: "0",
      userId: userId,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateTermService = async ({ accept, termId, userId }) => {
  try {
    const term = await db.Term.findOne({
      where: { id: termId },
      include: [{ model: db.Contract, raw: true }],
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
      await term.update({ accept: accept });
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateValueCostTermService = async ({ value, costId, userId }) => {
  try {
    const cost = await db.Cost.findOne({
      where: { id: costId },
      include: [{ model: db.Contract }],
    });
    if (cost?.dataValues && cost?.dataValues.Contract) {
      const costData = cost.get({ plain: true });
      if (
        costData.Contract.sellerId !== userId &&
        costData.Contract.renterId !== userId
      ) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await cost.update({ value: value, accept: false, userId: userId });
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateAcceptCostTermService = async ({
  accept,
  costId,
  userId,
}) => {
  try {
    const cost = await db.Cost.findOne({
      where: { id: costId },
      include: [{ model: db.Contract }],
    });
    if (cost?.dataValues && cost?.dataValues.Contract) {
      const costData = cost.get({ plain: true });
      const ownerId =
        costData.Contract.sellerId === cost.userId
          ? costData.Contract.renterId
          : costData.Contract.sellerId;
      if (ownerId !== userId) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await cost.update({ accept: accept });
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateValueTimeStartTermService = async ({
  value,
  timeStartId,
  userId,
}) => {
  try {
    const timeStart = await db.TimeStart.findOne({
      where: { id: timeStartId },
      include: [{ model: db.Contract }],
    });
    if (timeStart?.dataValues && timeStart?.dataValues.Contract) {
      const timeStartData = timeStart.get({ plain: true });
      if (
        timeStartData.Contract.sellerId !== userId &&
        timeStartData.Contract.renterId !== userId
      ) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await timeStart.update({ value: value, accept: false, userId: userId });
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateAcceptTimeStartTermService = async ({
  accept,
  timeStartId,
  userId,
}) => {
  try {
    const timeStart = await db.TimeStart.findOne({
      where: { id: timeStartId },
      include: [{ model: db.Contract }],
    });
    if (timeStart?.dataValues && timeStart?.dataValues.Contract) {
      const timeStartData = timeStart.get({ plain: true });
      const ownerId =
        timeStartData.Contract.sellerId === timeStart.userId
          ? timeStartData.Contract.renterId
          : timeStartData.Contract.sellerId;
      if (ownerId !== userId) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }
      await timeStart.update({ accept: accept });
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
