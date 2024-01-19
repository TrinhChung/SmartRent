import db from "../models/index";
import { sendMailRegister } from "../services/mail";
import { createVerify } from "./verify";

export const signUpUserService = async (data) => {
  try {
    var res = await db.User.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      isActive: false,
    });
    res = res.get({ plain: true });
    if (res) {
      delete res["password"];
      await createVerify({ type: "1", data: res });
    }

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Register service error");
  }
};
