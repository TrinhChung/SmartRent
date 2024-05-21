import { getUserPaymentDeadline } from "../services/remind";
import { sendMailRemindPayment } from "../services/mail";
import { sendNotification } from "./socket";
import { createContractInstanceSMC } from "../config/connectSMC";
import { logger } from "../cron-job/logger";
import { createNotifyService } from "../services/notify";

export const handleGetUserPayment = async () => {
  try {
    console.log("Start get user payment");
    logger.info("Start get user payment");

    const contracts = await getUserPaymentDeadline();

    if (contracts.length > 0) {
      const contractInstance = createContractInstanceSMC(
        process.env.CONTRACT_ADDRESS
      );
      for (let eachContract of contracts) {
        const res = await contractInstance.payRentCost(eachContract?.id);
        if (res === false) {
          var tmp = { email: eachContract.renter.email };
          await sendMailRemindPayment(tmp);

          await createNotifyService(
            {
              userId: eachContract.sellerId,
              fkId: eachContract?.RoomChat?.id,
              content: `Tiền thuê nhà chưa được thanh toán`,
              type: "2",
              eventNotify: "sign-contract",
            },
            true
          );

          await createNotifyService(
            {
              userId: eachContract.renterId,
              fkId: eachContract?.RoomChat?.id,
              content: `Tiền thuê nhà chưa được thanh toán`,
              type: "2",
              eventNotify: "sign-contract",
            },
            true
          );
        } else {
          console.log("Thanh toán thành công");
          await createNotifyService(
            {
              userId: eachContract.sellerId,
              fkId: eachContract?.RoomChat?.id,
              content: `Tiền thuê nhà đã được thanh toán`,
              type: "2",
              eventNotify: "sign-contract",
            },
            true
          );

          await createNotifyService(
            {
              userId: eachContract.renterId,
              fkId: eachContract?.RoomChat?.id,
              content: `Đã thanh toán tiền nhà tháng này`,
              type: "2",
              eventNotify: "sign-contract",
            },
            true
          );
        }
      }
    } else {
      logger.info("No contract need payment");
      console.log("No contract need payment");
    }
  } catch (error) {
    console.log("Get user payment failure", error);
    logger.error("Get user payment failure", error.message);
    res.status(400).json({ message: `get users have deadline error` });
  } finally {
    console.log("End get user payment");
    logger.info("End get user payment");
  }
};
