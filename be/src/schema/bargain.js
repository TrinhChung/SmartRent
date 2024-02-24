const validator = require("validator");

export const createBargainSchema = {
  sellerId: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "SellerId address is required",
      },
    ],
  },
  renterId: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "renterId address is required",
      },
    ],
  },
  realEstateId: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "realEstateId address is required",
      },
    ],
  },
};
