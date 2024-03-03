export const createBargainSchema = {
  sellerId: {
    rules: [
      {
        rule: (input) => !input,
        message: "SellerId address is required",
      },
    ],
  },
  realEstateId: {
    rules: [
      {
        rule: (input) => !input,
        message: "realEstateId address is required",
      },
    ],
  },
};

export const closeBargainSchema = {
  bargainId: {
    rules: [
      {
        rule: (input) => !input || typeof input !== "number",
        message: "SellerId address is required",
      },
    ],
  },
};
