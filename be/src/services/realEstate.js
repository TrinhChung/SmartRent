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

    console.log(address);

    var realEstate = await db.RealEstate.create(
      {
        name: data.name,
        userId: data.userId,
        addressId: address.id,
        cost: data.cost,
        acreage: data.acreage,
        descriptionMarkdown: data.description,
        autoPayment: data?.autoPayment,
        isAllowPet: data?.isAllowPet,
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
