import { createBargainService } from "../services/bargain";

export const handleCreateBargain = async (req, res, next) => {
  try {
    const data = req.body;
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
