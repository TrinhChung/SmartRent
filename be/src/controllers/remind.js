import { getUserPaymentDeadline } from "../services/remind";
import { sendMailRemindPayment } from "../services/mail";
import moment from "moment";
import { sendNotification } from "./socket";
import { createContractInstanceSMC } from "../config/connectSMC";

export const handleGetUserPayment = async (req, res, next) => {
  try {
    const users = await getUserPaymentDeadline();
    const contractInstance = createContractInstanceSMC(contractAddress);
    for (eachUser of users) {
      const res = await contractInstance.payRentCost(eachUser.id);
        var tmp = { email: eachUser.renter.email };
        await sendMailRemindPayment(tmp);
        await sendNotification({
          userId: eachUser.renter.userId,
          eventNotify: "remind-deadline",
          data: {},
          transaction: true,
        });
    }
    return res
      .status(200)
      .json({ message: "get users successfully", data: users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `get users have deadline error` });
  }
};

export const autoExecute = async (req, res, next) => {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  try {

  } catch (error) {
    console.log(`autoExecute error` + error)
  }
}