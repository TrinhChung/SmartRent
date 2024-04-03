import { getUserPaymentDeadline } from "../services/remind";
import { sendMailRemindPayment } from "../services/mail";
import moment from "moment";
import { sendNotification } from "./socket";
import { createContractInstanceSMC } from "../config/connectSMC";

export const handleGetUserPayment = async (req, res, next) => {
  try {
    const contracts = await getUserPaymentDeadline();
    const contractInstance = createContractInstanceSMC(contractAddress);
    for (eachContract of contracts) {
      const res = await contractInstance.payRentCost(eachContract.id);
      if (res === false) {
        var tmp = { email: eachContract.renter.email };
        await sendMailRemindPayment(tmp);
        await sendNotification({
          userId: eachContract.renter.userId,
          eventNotify: "remind-deadline",
          data: {},
          transaction: true,
        });
      }
    }
    return res
      .status(200)
      .json({ message: "get users successfully", data: contracts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `get users have deadline error` });
  }
};