import db from "../models/index";
export const checkUserEmail = async (email) => {
  let user = await db.User.findOne({ where: { email: email } });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const checkTokenIsExist = async (token) => {
  try {
    let verify = await db.Verify.findOne({
      where: { token: token },
      raw: false,
    });
    console.log(verify);
    if (verify) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Check token exist error");
    return false;
  }
};
