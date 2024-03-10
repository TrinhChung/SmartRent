import {
  createContractService,
  checkContractIsExistService,
  closeContractService,
  getContractService,
  getContractByIdService,
} from "../services/contract";

export const handleInitContract = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.id === req.body.sellerId) {
      return res
        .status(400)
        .json({ message: "Bạn không thể tạo phòng đàm phán với chính mình" });
    }
    const check = await checkContractIsExistService({
      userId: req.user.id,
      realEstateId: req.body.realEstateId,
    });

    if (check === true) {
      return res
        .status(400)
        .json({ message: "Bạn đang có hợp đồng của dự án này" });
    }

    const data = { ...req.body, renterId: user.id };
    const contract = await createContractService(data);
    return res.status(200).json({
      message: "Create contract successfully",
      data: contract,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error creating contract" });
  }
};

export const handleCloseContract = async (req, res) => {
  try {
    const user = req.user;
    await closeContractService(user.id, req.body.contractId);
    return res.status(200).json({ message: "Close contract successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error close contract" });
  }
};

export const handleGetContractForMe = async (req, res) => {
  try {
    const user = req.user;
    const data = await getContractService({ userId: user.id });
    return res
      .status(200)
      .json({ message: "Get contract success ", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error get contract" });
  }
};

export const handleGetContractById = async (req, res) => {
  try {
    const data = await getContractByIdService({ id: req.params.id });
    return res
      .status(200)
      .json({ message: "Get contract success ", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error get contract by id" });
  }
};
