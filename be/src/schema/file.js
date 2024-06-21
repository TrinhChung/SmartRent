const validator = require("validator");

export const uploadContractSchema = {
  contractId: {
    rules: [
      {
        rule: (input) => !input || typeof input !== "number",
        message: "contractId is required",
      },
    ],
  },
  file: {
    rules: [
      {
        rule: (input) => !input,
        message: "file is required",
      },
      {
        rule: (input) => !validator.isBase64(input),
        message: "file is not base64",
      },
    ],
  },
};
