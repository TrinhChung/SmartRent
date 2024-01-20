import db from "../models/index";
import { createVerify } from "./verify";
import bcrypt from "bcryptjs";

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

export const loginUserService = async (data) => {
  let user = await db.User.findOne({
    where: { email: data.email },
  });
  if (user) {
    let check = bcrypt.compareSync(data.password, user.password);
    delete user.password;
    if (check) {
      return { message: "Login successful", data: user };
    }
  }
  throw new Error("Email or password is incorrect");
};
