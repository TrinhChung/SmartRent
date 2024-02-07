import {
  createRealEstateService,
  getRealEstateFullHouseService,
  getRealEstateFullHouseByUserIdService,
  getRealEstateByRecommendService,
} from "../services/realEstate";

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

    const data = await getRealEstateFullHouseService(realEstateId);
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

    const data = await getRealEstateFullHouseByUserIdService({
      userId: user?.id,
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

    const data = await getRealEstateByRecommendService({
      userId: user?.id,
    });

    return res
      .status(200)
      .json({ message: "Get real estate recommend success", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
