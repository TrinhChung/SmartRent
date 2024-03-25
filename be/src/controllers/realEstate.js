import {
  createRealEstateService,
  getRealEstateFullHouseService,
  getRealEstateFullHouseByUserIdService,
  getRealEstateByRecommendService,
  searchRealEstateService,
  dumpAllRealEstateService,
} from "../services/realEstate";
import { renterPaymentSmartContractService } from "../services/contract";

export const handleCreateRealEstate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    const realEstate = await createRealEstateService({
      ...data,
      userId: user.id,
    });

    return res
      .status(200)
      .json({ message: "Create real estate success", data: realEstate });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error creating Real Estate" });
  }
};

export const handleGetRealEstate = async (req, res) => {
  try {
    const realEstateId = req.params.id;
    const userId = req?.user?.id;

    const data = await getRealEstateFullHouseService(realEstateId, userId);
    if (!data) {
      return res
        .status(404)
        .json({ message: `Can't find by id ${realEstateId}` });
    }
    return res
      .status(200)
      .json({ message: "Get real estate success", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleGetRealEstateByUserId = async (req, res) => {
  try {
    const user = req.user;
    const queries = req.query;
    const limit = 10;
    var { page, ...orders } = queries;
    const orderByList = [];
    for (let order in orders) {
      const orderBy = [];
      orderBy.push(order);
      orderBy.push(orders[order]);
      orderByList.push(orderBy);
    }

    const data = await getRealEstateFullHouseByUserIdService({
      userId: user?.id,
      page: page,
      limit: limit,
      orders: orderByList,
    });

    return res
      .status(200)
      .json({ message: "Get real estate success", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleSearchRealEstate = async (req, res) => {
  try {
    const queries = req.body.queries;
    const orders = req.body.orders;
    const page = req.body.page;
    const limit = 10;

    const orderByList = [];
    for (let order in orders) {
      if (orders[order]) {
        const orderBy = [];
        orderBy.push(order);
        orderBy.push(orders[order]);
        orderByList.push(orderBy);
      }
    }

    const data = await searchRealEstateService({
      page: page,
      orders: orderByList,
      queries: queries,
      limit: limit,
    });

    return res
      .status(200)
      .json({ message: "Get real estate success", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleGetRealEstateByRecommend = async (req, res) => {
  try {
    const user = req.user;
    const realEstateId = req.body?.realEstateId;

    const data = await getRealEstateByRecommendService({
      userId: user?.id,
      realEstateId: realEstateId,
    });

    return res
      .status(200)
      .json({ message: "Get real estate recommend success", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleGetAllRealEstate = async (req, res) => {
  try {
    await dumpAllRealEstateService();
    return res.status(200).json({ message: "Get all real estate" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleRenterPaymentSmartContract = async (req, res) => {
  try {
    const data = { userId: req.user.id, contractId: req.body.contractId };
    await renterPaymentSmartContractService(data);

    return res
      .status(200)
      .json({ message: "Renter payment deposit smart contract" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
