export const initContractSchema = {
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

export const cancelContractSchema = {
  contractId: {
    rules: [
      {
        rule: (input) => !input || typeof input !== "number",
        message: "contractId is required",
      },
    ],
  },
};
