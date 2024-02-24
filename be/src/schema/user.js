const validator = require("validator");

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
};
