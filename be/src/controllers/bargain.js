export const handleCreateBargain = (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Create Success",
    });
  } catch (error) {
    return res.status(400).json({ message: "Server error creating bargain" });
  }
};
