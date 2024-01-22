import { loginUserService } from "../services/auth";
const { signUpUserService } = require("../services/auth");

export const handleRegisterUser = async (req, res) => {
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

export const handleLoginUser = async (req, res) => {
  try {
    const data = await loginUserService(req.body);
    console.log(data)
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const handleLoginByToken = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({ data: req.user });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const handleLogoutUser = async (req, res) => {
  return res.status(200).json({ message: "User logged out" });
};
