import db from "../models/index";
import { createAddressService } from "./address";
import { createFileService } from "./file";

export const createRealEstateService = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    const address = await createAddressService({
      address: {
        ...data.location,
        address: data.address,
      },
      transaction: transaction,
    });

    var realEstate = await db.RealEstate.create(
      {
        name: data.name,
        userId: data.userId,
        addressId: address.id,
        cost: data.cost,
        acreage: data.acreage,
        description: data.description,
        autoPayment: data?.autoPayment,
        isPet: data?.isAllowPet,
        isPaymentCoin: data?.isPaymentCoin,
        isWhole: data?.isWhole,
      },
      { transaction: transaction }
    );

    if (data.imgRealEstate.length > 0) {
      realEstate = realEstate.get({ plain: true });
      await createFileService(
        {
          fkId: realEstate.id,
          files: data.imgRealEstate,
        },
        "2",
        transaction
      );
    }

    await transaction.commit();

    return realEstate;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error("Create real estate service error", error);
  }
};

export const getRealEstateFullHouseService = async (id) => {
  try {
    const realEstate = await db.RealEstate.findOne({
      where: { id: id },
      include: [
        {
          model: db.File,
          where: {
            typeFk: "2",
          },
          as: "realEstateFiles",
          attributes: ["url"],
        },
        {
          model: db.Floor,
          include: [
            {
              model: db.File,
              where: {
                typeFk: "3",
              },
              attributes: ["url"],
            },
          ],
        },
        { model: db.Address },
      ],
    });
    if (!realEstate) {
      return null;
    }
    return realEstate.get({ plain: true });
  } catch (error) {
    console.log(error.status);
    throw new Error(error.message, error);
  }
};
