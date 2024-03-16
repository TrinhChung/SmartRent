import db from "../models/index";

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

export const signContractSchema = {
  contractId: {
    rules: [
      {
        rule: (input) => !input || typeof input !== "number",
        message: "contractId is required",
      },
      {
        rule: async (input) => {
          const contract = await db.Contract.findOne({ where: { id: input } });
          if (!contract) {
            return true;
          }
          return false;
        },
        message: "contractId is not exist",
      },
    ],
  },
};
