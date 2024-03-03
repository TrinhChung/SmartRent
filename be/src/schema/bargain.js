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
