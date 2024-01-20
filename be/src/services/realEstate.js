import db from "../models/index";
import { createAddressService } from "./address";

export const createRealEstateService = async (data) => {
  const address = await createAddressService({ ...data.address });
  const realEstate = await db.RealEstate.create({
    name: data.name,
    userId: data.userId,
    addressId: address.id,
    cost: data.cost,
    acreage: data.acreage,
    status: data.status,
  });
  return realEstate;
};
