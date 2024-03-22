export const handleViewRealEstate = async (req, res) => {
  try {
    const realEstateId = req.body.realEstateId;
    return res.status(200).json({ message: "View real estate successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
