import db from "../models/index";
import { createVerify } from "./verify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    user = user.get({ plain: true });
    let check = bcrypt.compareSync(data.password, user.password);
    delete user["password"];
    if (check) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return {
        message: "Login successful",
        data: { user: user, token: token },
      };
    }
  }
  throw new Error("Email or password is incorrect");
};
