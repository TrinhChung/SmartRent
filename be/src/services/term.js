import db from "../models/index";
import { createNotifyService } from "./notify";
import { senNotifyUpdateTerm } from "../controllers/socket";
import {
  buildContentCost,
  buildContentDeposit,
  buildTimeStart,
  buildDeadlinePayment,
} from "../utils/buildContentValue";
import {
  statusTerm,
  messageCreateTermNotify,
  listTermFixed,
} from "../constants/typeValue";

export const createTermService = async ({ contractId, userId, content }) => {
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

    if (contract.status !== "3") {
      throw new Error("Đã kết thúc giai đoạn đàm phán");
    }

    await db.Term.create(
      {
        content: content,
        value: null,
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
        content: messageCreateTermNotify["otherCreate"],
        type: "4",
        eventNotify: "notify-term",
      },
      transaction
    );

    await transaction.commit();

    await senNotifyUpdateTerm(
      {
        roomChatId: contract?.RoomChat?.id,
        userId: receiver,
      },
      "update-term"
    );
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};

export const createTermCost = async ({
  contractId,
  value,
  addressRe,
  transaction,
  userId,
}) => {
  try {
    // create a new term cost
    await db.Term.create(
      {
        content: buildContentCost(value, addressRe),
        value: value,
        contractId: contractId,
        accept: "0",
        userId: userId,
        type: "cost",
      },
      { transaction: transaction }
    );

    // create a new term deposit
    await db.Term.create(
      {
        content: buildContentDeposit(value),
        value: null,
        contractId: contractId,
        accept: "0",
        userId: userId,
        type: "deposit",
      },
      { transaction: transaction }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error creating term cost", error);
  }
};

export const createTermTimeStart = async ({
  contractId,
  value,
  transaction,
  userId,
}) => {
  try {
    // create a new term time start
    await db.Term.create(
      {
        content: buildTimeStart(value),
        value: String(value),
        contractId: contractId,
        accept: "0",
        userId: userId,
        type: "timeStart",
      },
      { transaction: transaction }
    );

    // create a new term deadline payment
    await db.Term.create(
      {
        content: buildDeadlinePayment(value),
        value: null,
        contractId: contractId,
        accept: "0",
        userId: userId,
        type: "deadline",
      },
      { transaction: transaction }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Create term time start error: ", error);
  }
};

export const createTermFixed = async ({ contractId, userId, transaction }) => {
  const listTermBuilt = listTermFixed.map((term) => {
    return {
      value: null,
      content: term,
      userId: userId,
      contractId: contractId,
      accept: "1",
      type: "fixed",
    };
  });

  await db.Term.bulkCreate(listTermBuilt, { transaction: transaction });
};

export const updateTermService = async ({
  accept = "0",
  value,
  termId,
  userId,
}) => {
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
            {
              model: db.RealEstate,
              required: true,
              include: [
                {
                  model: db.Address,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    });
    const termData = term.get({ plain: true });

    if (termData?.Contract) {
      if (termData.Contract.status !== "3") {
        throw new Error("Đã kết thúc giai đoạn đàm phán");
      }

      if (
        (termData.type === "cost" || termData.type === "timeStart") &&
        accept === "0" &&
        (!value || value.length === 0)
      ) {
        throw new Error("Thiếu giá trị của điều khoản");
      }

      const ownerId =
        termData.Contract.sellerId === termData.userId
          ? termData.Contract.renterId
          : termData.Contract.sellerId;
      if (accept === "1" && ownerId !== userId) {
        throw new Error("Không thể chỉnh sửa điều khoản của người khác");
      }

      if (termData.type === "cost") {
        await updateTermCost({
          term: term,
          value: value,
          accept: accept,
          userId: userId,
          transaction: transaction,
        });
      }

      if (termData.type === "timeStart") {
        await updateTermTimeStart({
          term: term,
          value: value,
          accept: accept,
          userId: userId,
          transaction: transaction,
        });
      }

      if (termData.type === "other") {
        await updateTermOther({
          term: term,
          accept: accept,
          transaction: transaction,
        });
      }

      const receiver =
        userId !== termData.Contract.sellerId
          ? termData.Contract.sellerId
          : termData.Contract.renterId;

      await createNotifyService(
        {
          userId: receiver,
          fkId: termData?.Contract?.RoomChat?.id,
          content: messageCreateTermNotify[termData.type + statusTerm[accept]],
          type: "5",
          eventNotify: "notify-term",
        },
        transaction
      );

      await senNotifyUpdateTerm(
        {
          roomChatId: termData?.Contract?.RoomChat?.id,
          userId: receiver,
        },
        "update-term"
      );

      await transaction.commit();
    } else {
      throw new Error("Không tìm thấy hợp đồng");
    }
  } catch (error) {
    console.log("Update error", error);
    await transaction.rollback();
    throw new Error(error);
  }
};

export const updateTermOther = async ({ term, accept, transaction }) => {
  await term.update({ accept: accept }, { transaction: transaction });
};

export const updateTermCost = async ({
  term,
  accept,
  value,
  userId,
  transaction,
}) => {
  const termData = term.get({ plain: true });
  // get term deposit by contract id and type
  const termDeposit = await db.Term.findOne({
    where: {
      contractId: termData.Contract.id,
      type: "deposit",
    },
  });

  if ((!value || value.length === 0) && accept !== "0") {
    console.log("Update accept");
    await term.update({ accept: accept }, { transaction: transaction });
    await termDeposit.update({ accept: accept }, { transaction: transaction });
  }
  if (value && Number(value) > 0 && accept === "0") {
    await term.update(
      {
        accept: "0",
        userId: userId,
        value: value,
        content: buildContentCost(
          value,
          termData.Contract.RealEstate.Address.address
        ),
      },
      { transaction: transaction }
    );

    await termDeposit.update(
      {
        accept: "0",
        userId: userId,
        value: value,
        content: buildContentDeposit(value),
      },
      { transaction: transaction }
    );
  }
};

export const updateTermTimeStart = async ({
  term,
  accept,
  value,
  userId,
  transaction,
}) => {
  const termData = term.get({ plain: true });

  // get term deadline by contract id and type
  const termDeadline = await db.Term.findOne({
    where: {
      contractId: termData.Contract.id,
      type: "deadline",
    },
  });

  if ((!value || value.length === 0) && accept !== "0") {
    await term.update({ accept: accept }, { transaction: transaction });
    await termDeadline.update({ accept: accept }, { transaction: transaction });
  }
  if (value && value.length > 0 && accept === "0") {
    await term.update(
      {
        accept: accept,
        userId: userId,
        value: String(value),
        content: buildTimeStart(value),
      },
      { transaction: transaction }
    );

    await termDeadline.update(
      {
        accept: accept,
        userId: userId,
        value: String(value),
        content: buildDeadlinePayment(value),
      },
      { transaction: transaction }
    );
  }
};
