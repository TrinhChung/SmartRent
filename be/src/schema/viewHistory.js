import db from "../models/index";
const validator = require("validator");

export const viewRealEstateSchema = {
  realEstateId: {
    rules: [
      {
        rule: (input) => !input || !validator.isInt(String(input)),
        message: "realEstateId is required",
      },
      {
        rule: (input) => {
          const realEstate = db.realEstate.findOne({
            where: { id: Number(input) },
          });
          if (!realEstate) {
            return true;
          }
          return false;
        },
        message: "realEstate not exists",
      },
    ],
  },
};
