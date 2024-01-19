import { sendMailRegister } from "../services/mail";

let handleRegisterUser = async (req, res) => {
  try {
    const data = req.body;
    if (data.email === null || data.email === undefined) {
      return res.status(400).json({ msgError: "No Email Address" });
    }
    await sendMailRegister(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msgError: "Server Error Register" });
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
