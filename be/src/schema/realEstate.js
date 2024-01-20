const validator = require("validator");

export const createRealEstateSchema = {
  userId: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "UserId is required",
      },
    ],
  },
  name: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Name is required",
      },
    ],
  },
  address: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "address is required",
      },
    ],
  },

  cost: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Cost is required",
      },
    ],
  },
  acreage: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Acreage is required",
      },
    ],
  },
  status: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Status is required",
      },
    ],
  },
};
