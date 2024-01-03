export const handleCreateContract = async (req, res, next) => {
  try {
    return res.status(200).json({ status: 1 });
  } catch (error) {
    console.log(error);
  }
};
