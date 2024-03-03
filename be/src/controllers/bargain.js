import {
  createBargainService,
  checkBargainIsExistService,
} from "../services/bargain";

export const handleCreateBargain = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.id === req.body.sellerId) {
      return res
        .status(400)
        .json({ message: "Bạn không thể tạo phòng đàm phán với chính mình" });
    }

    if (
      checkBargainIsExistService({
        userId: req.user.id,
        realEstateId: req.body.realEstateId,
      }) === true
    ) {
      return res
        .status(400)
        .json({ message: "Bạn đang có hợp đồng của dự án này" });
    }

    const data = { ...req.body, renterId: user.id };
    const bargain = await createBargainService(data);
    return res.status(200).json({
      message: "Create bargain successfully",
      data: bargain,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error creating bargain" });
  }
};
