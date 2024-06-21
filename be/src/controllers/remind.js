import { getUserPaymentDeadline } from "../services/remind";
import { sendMailRemindPayment } from "../services/mail";
import { createContractInstanceSMC } from "../config/connectSMC";
import { logger } from "../cron-job/logger";
import { createNotifyService } from "../services/notify";
import { updateDurationContractService } from "../services/contract";

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
        eachContract = eachContract.get({ plain: true });
        // const res = await contractInstance.payRentCost(eachContract?.id);

        const res = true;
        if (res === false) {
          var tmp = { email: eachContract.renter.email };
          await sendMailRemindPayment(tmp);

          await createNotifyService({
            userId: eachContract.sellerId,
            fkId: eachContract?.RoomChat?.id,
            content: `Tiền thuê nhà chưa được thanh toán.`,
            type: "2",
            eventNotify: "sign-contract",
          });

          await createNotifyService({
            userId: eachContract.renterId,
            fkId: eachContract?.RoomChat?.id,
            content: `Tiền thuê nhà chưa được thanh toán. Vui lòng nập tiền thanh toán`,
            type: "2",
            eventNotify: "sign-contract",
          });

          logger.info(
            `Tiền thuê nhà chưa được thanh toán contract: ${eachContract?.id}`
          );
          console.log(
            `Tiền thuê nhà chưa được thanh toán contract: ${eachContract?.id}`
          );
        } else {
          console.log("Thanh toán thành công");
          logger.info("No contract need payment");

          updateDurationContractService({ contractId: eachContract?.id });

          await createNotifyService({
            userId: eachContract.sellerId,
            fkId: eachContract?.RoomChat?.id,
            content: `Tiền thuê nhà đã được thanh toán`,
            type: "2",
            eventNotify: "sign-contract",
          });

          await createNotifyService({
            userId: eachContract.renterId,
            fkId: eachContract?.RoomChat?.id,
            content: `Đã thanh toán tiền nhà tháng này`,
            type: "2",
            eventNotify: "sign-contract",
          });
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
