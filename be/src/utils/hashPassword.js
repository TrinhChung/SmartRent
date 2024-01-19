import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  try {
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  hashUserPassword: hashUserPassword,
};
