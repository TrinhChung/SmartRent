import { verifyAccountService } from "../services/verify";

export const verifyAccountController = async (req, res, next) => {
  try {
    const token = req.params.token;
    await verifyAccountService(token);
    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
};
