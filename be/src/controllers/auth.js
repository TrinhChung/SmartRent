import { loginUserService } from "../services/auth";
const { signUpUserService } = require("../services/auth");

let handleRegisterUser = async (req, res) => {
  try {
    const data = req.body;
    data.to = data.email;
    const user = await signUpUserService(data);
    return res
      .status(200)
      .json({ message: "Sign up successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

let handleLoginUser = async (req, res) => {
  try {
    const data = await loginUserService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleRegisterUser: handleRegisterUser,
  handleLoginUser: handleLoginUser,
};
