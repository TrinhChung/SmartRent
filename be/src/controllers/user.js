import {
  changePasswordService,
  updateInfoUserService,
  sendEmailForgotPasswordService,
  resetPasswordService,
} from "../services/user";

export const handleUpdateUserInfo = async (req, res, next) => {
  try {
    const user = await updateInfoUserService({
      ...req.body,
      userId: req.user.id,
      addressId: req.user.addressId,
      oldLat: req.user?.Address?.lat,
      oldLng: req.user?.Address?.lng,
    });

    return res
      .status(200)
      .json({ message: "Cập nhật thông tin thành công", data: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleChangePassword = async (req, res, next) => {
  try {
    const data = { userId: req.user.id, ...req.body };
    await changePasswordService(data);

    return res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleRequestForgotPassword = async (req, res, next) => {
  try {
    const data = { email: req.body.email };
    await sendEmailForgotPasswordService(data);

    return res.status(200).json({ message: "Đã gửi email thay đổi mật khẩu" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleResetPassword = async (req, res, next) => {
  try {
    const data = { password: req.body.password, token: req.body.token };

    await resetPasswordService(data);
    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleUpdateWallet = async (req, res, next) => {
  try {
    const data = { wallet: req.body.wallet, userId: req.user.id };

    await resetPasswordService(data);
    return res.status(200).json({ message: "Cập nhật địa chỉ ví thành công" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
