import db from "../models/index";

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

    await db.RoomChat.create(
      {
        bargainId: bargain.id,
      },
      { transaction: transaction }
    );

    transaction.commit();

    return bargain.get({ plain: true });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("Create Bargain Failed", error);
  }
};
