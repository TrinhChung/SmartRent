import db from "../models/index";
import { Op } from "sequelize";
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
          required: false,
          as: "realEstateFiles",
          attributes: ["url"],
        },
        { model: db.Address },
        {
          model: db.User,
          attributes: {
            exclude: [
              "password",
              "maritalStatus",
              "isActive",
              "birthday",
              "role",
              "AddressId",
            ],
          },
          include: [
            {
              model: db.File,
              where: {
                typeFk: "5",
              },
              required: false,
              attributes: ["url"],
            },
          ],
        },
      ],
      subQuery: false,
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

export const getRealEstateFullHouseByUserIdService = async ({
  userId,
  page = 1,
  limit = 10,
  orders = [],
}) => {
  try {
    const total = await db.RealEstate.count({
      where: { userId: userId },
    });

    const list = await db.RealEstate.findAll(
      {
        where: { userId: userId },
        include: [
          {
            model: db.File,
            where: {
              typeFk: "2",
            },
            limit: 1,
            required: false,
            as: "realEstateFiles",
            attributes: ["url"],
          },
          { model: db.Address },
        ],
        order: orders,
        offset: (page - 1) * limit,
        subQuery: false,
        limit: limit,
      },
      { raw: true }
    );

    return { total: total, list: list };
  } catch (error) {
    console.log(error.status);
    throw new Error(error.message, error);
  }
};

export const getRealEstateByRecommendService = async ({ userId }) => {
  try {
    const list = await db.RealEstate.findAll(
      {
        include: [
          {
            model: db.File,
            where: {
              typeFk: "2",
            },
            limit: 1,
            required: false,
            as: "realEstateFiles",
            attributes: ["url"],
          },
          { model: db.Address },
        ],
        subQuery: false,
        limit: 10,
      },
      { raw: true }
    );

    return list;
  } catch (error) {
    console.log(error.status);
    throw new Error(error.message, error);
  }
};

export const searchRealEstateService = async ({
  page = 1,
  orders,
  queries,
  limit = 10,
}) => {
  try {
    var whereCondition = {};

    if (queries?.costMin) {
      whereCondition["cost"] = { [Op.gte]: queries.costMin };
    }
    if (queries?.isInterior !== null || queries?.isInterior !== undefined) {
      whereCondition["isInterior"] = queries?.isInterior;
    }

    if (queries?.isAllowPet === true) {
      whereCondition["isPet"] = queries?.isAllowPet;
    }

    if (queries?.type) {
      whereCondition["type"] = queries?.type;
    }

    if (queries?.costMax) {
      whereCondition["cost"] = {
        ...whereCondition["cost"],
        [Op.lte]: queries.costMax,
      };
    }

    if (queries?.acreageMin) {
      whereCondition["acreage"] = { [Op.gte]: queries.acreageMin };
    }
    if (queries?.acreageMax) {
      whereCondition["acreage"] = {
        ...whereCondition["acreage"],
        [Op.lte]: queries.acreageMax,
      };
    }

    const total = await db.RealEstate.count({});

    const list = await db.RealEstate.findAll(
      {
        where: whereCondition,
        include: [
          {
            model: db.File,
            where: {
              typeFk: "2",
            },
            limit: 1,
            as: "realEstateFiles",
            attributes: ["url"],
          },
          { model: db.Address },
        ],
        order: orders,
        offset: (page - 1) * limit,
        subQuery: false,
        limit: 10,
      },
      { raw: true }
    );

    return { total: total, list: list };
  } catch (error) {
    console.log(error.status);
    throw new Error(error.message, error);
  }
};
