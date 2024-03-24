import { getUserPaymentDeadline } from "../services/remind";
import { sendMailRemindPayment } from "../services/mail";
import { sendNotification } from "../services/socket";s
import { createContractInstanceSMC } from "../config/connectSMC"
import { handleGetScAddressSc } from "./smartcontract";
import moment from "moment";

export const handleGetUserPayment = async (req, res, next ) => {
    try {
        var today = moment(new Date()).format('DD');
        const data = "-" + today + "T";
        console.log(data);
        const users = await getUserPaymentDeadline(data);
        for (eachUser of users) {
            var tmp = {email: eachUser.renter.email}
            await sendMailRemindPayment(tmp);
            await sendNotification({userId: eachUser.renter.userId, eventNotify: "remind-deadline",data: {}})
        }
        return res
            .status(200)
            .json({ message: "get users successfully", data: users});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: `get users have deadline error`});
    }
}