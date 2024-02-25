const validator = require("validator");
const moment = require("moment");

export const updateUserInfoSchema = {
  email: {
    rules: [
      {
        rule: (input) => {
          return !input || validator.isEmpty(input);
        },
        message: "Email address is required",
      },
    ],
  },

  phoneNumber: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "phoneNumber is required",
      },
      {
        rule: (input) => !validator.isMobilePhone(input, "vi-VN"),
        message: "phoneNumber is valid",
      },
    ],
  },
  location: {
    rules: [
      {
        rule: (input) => !input,
        message: "location is required",
      },
      {
        rule: (input) => Math.abs(input) > 90,
        message: "lat is invalid",
      },
      {
        rule: (input) => Math.abs(input) > 180,
        message: "lng is invalid",
      },
    ],
  },
  address: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "address is required",
      },
    ],
  },
  wallet: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "wallet is required",
      },
      {
        rule: (input) => !validator.isEthereumAddress(input),
        message: "wallet is not ethereum address",
      },
    ],
  },
  birthday: {
    rules: [
      {
        rule: (input) => !moment(input, moment.ISO_8601, true).isValid(),
        message: "birthday is invalid",
      },
    ],
    optional: true,
  },
  avatar: {
    optional: true,
    rules: [
      {
        rule: (image) => {
          if (!image.name || !image.key) {
            return true;
          }
          return false;
        },
        message: "Avatar invalid",
      },
    ],
  },
  gender: {
    optional: true,
    rules: [
      {
        rule: (input) => input !== "1" && input !== "2",
        message: "gender is invalid",
      },
    ],
  },
  maritalStatus: {
    optional: true,
    rules: [
      {
        rule: (input) => input !== "1" && input !== "2",
        message: "maritalStatus is invalid",
      },
    ],
  },
};
