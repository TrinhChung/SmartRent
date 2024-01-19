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
    console.log(error);
    return res.status(500).json(error);
  }
};

let handleLoginUser = async (req, res) => {
  const data = req.body;
  console.log(data);
  return res.status(200).json(data);
};

module.exports = {
  handleRegisterUser: handleRegisterUser,
  handleLoginUser: handleLoginUser,
};
