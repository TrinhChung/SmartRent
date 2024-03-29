const validator = require("validator");
import { checkTokenIsExist } from "../utils/validatorDb";

export const verifyAccountSchema = {
  token: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "Token is required",
      },
      {
        rule: async (input) => !(await checkTokenIsExist(input)),
        message: "Url không tồn tại hoặc đã được sử dụng",
      },
    ],
  },
};
