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

export const verifyAccountService = async (token) => {
  const transaction = await db.sequelize.transaction();
  try {
    let verify = (verify = await db.Verify.findOne({
      where: { token: token },
    }));

    if (verify) {
      let user = await db.User.findByPk(verify.fkId);
      if (user) {
        await user.update({ isActive: true });
        await db.Verify.destroy({ where: { id: verify.id } });
      }
    }
    transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};
