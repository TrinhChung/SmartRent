export const handleUpdateUserInfo = async (req, res, next) => {
  try {
    console.log(req.body);
    return res.status(200).json({ message: "Cập nhật thông tin thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
