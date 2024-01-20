import { createRealEstateService } from "../services/realEstate";

export const handleCreateRealEstate = async (req, res, next) => {
  try {
    const data = req.body;
    const realEstate = await createRealEstateService(data);
    return res
      .status(200)
      .json({ message: "Create real estate success", data: realEstate });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error creating Real Estate" });
  }
};
