import db from "../models/index";
import { v4 as uuidv4 } from "uuid";
import { sendMailRegister } from "./mail";
require("dotenv").config();

export const createVerify = async ({ type = "1", data }) => {
  const verify = await db.Verify.create({
    fkId: data.id,
    type: type,
    email: data.email,
    token: uuidv4(),
  });
  if (verify && type === "1") {
    await sendMailRegister({
      ...data,
      url: process.env.HOST_BE + `/api/verify/account/${verify.token}`,
    });
  }
};
