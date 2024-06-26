import db from "../models/index";
import { Op } from "sequelize";
import { createAddressService } from "./address";
import { createFileService, writeFileRealEstate } from "./file";
import axios from "axios";

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

export const getRealEstateFullHouseService = async (id, userId) => {
  try {
    const realEstate = await db.RealEstate.findOne({
      where: { id: id, status: "1" },
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

    var realEstateData = realEstate.get({ plain: true });

    if (!userId) {
      return realEstateData;
    }
    const view = await db.ViewHistory.findOne({
      where: {
        realEstateId: realEstateData.id,
        userId: userId,
      },
    });
    if (!view) {
      await db.ViewHistory.create({
        userId: userId,
        realEstateId: realEstateData.id,
        viewCount: 1,
      });
    }

    return realEstateData;
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

export const getRecommendFromDjango = async (view) => {
  var ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var res = await axios.post(
    `http://${process.env.HOST_DJANGO}:${process.env.PORT_DJANGO}` +
      "/api/recommend",
    {
      view: view,
    }
  );

  if (res.status === 200) {
    ids = res.data.data;
  }
  return ids;
};

export const getRealEstateByRecommendService = async ({
  realEstateId,
  userId,
}) => {
  try {
    var view = 1;

    if (!realEstateId && userId) {
      var views = await db.ViewHistory.findAll({
        where: {
          userId: userId,
        },
      });

      if (views.length > 0) {
        view = views[0].realEstateId;
      }
    }
    if (realEstateId) {
      view = realEstateId;
    }

    const ids = await getRecommendFromDjango(view);

    const recommends = await db.RealEstate.findAll({
      where: { status: "1", id: ids },
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

    return recommends;
  } catch (error) {
    console.log(error);
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

    if (page <= 0) {
      throw new Error("Thao tác không hợp lệ");
    }

    if (queries?.costMin) {
      whereCondition["cost"] = { [Op.gte]: queries.costMin };
    }
    if (queries?.isInterior !== null && queries?.isInterior !== undefined) {
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

    const total = await db.RealEstate.count({ where: whereCondition });

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
            required: false,
            as: "realEstateFiles",
            attributes: ["url"],
          },
          { model: db.Address, required: false },
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
    console.log(error);
    throw new Error(error.message, error);
  }
};

export const dumpAllRealEstateService = async () => {
  try {
    const list = await db.RealEstate.findAll({
      include: [
        {
          model: db.Address,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["description"] },
      subQuery: false,
    });

    await writeFileRealEstate({ data: list });
  } catch (error) {
    console.log(error.status);
    throw new Error(error.message, error);
  }
};
