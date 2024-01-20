import db from "../models/index";
export const checkUserEmail = async (email) => {
  let user = await db.User.findOne({ where: { email: email } });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const checkUserIsActive = async (email) => {
  let user = await db.User.findOne({ where: { email: email } });
  if (!user || (user && user.isActive === false)) {
    return false;
  } else {
    return true;
  }
};

export const checkTokenIsExist = async (token) => {
  try {
    let verify = await db.Verify.findOne({
      where: { token: token },
      raw: false,
    });
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
