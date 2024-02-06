import db from "../models/index";

export const createAddressService = async ({ address, transaction }) => {
  try {
    const data = await db.Address.create(
      {
        lat: address.lat,
        lng: address.lng,
        address: address.address,
      },
      { transaction: transaction }
    );
    return data.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("Create Address failed");
  }
};
