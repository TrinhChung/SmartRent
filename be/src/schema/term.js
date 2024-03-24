import db from "../models/index";
const validator = require("validator");
const moment = require("moment");

export const createTermOtherSchema = {
  content: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "value is required",
      },
    ],
  },
  contractId: {
    rules: [
      {
        rule: (input) => !input,
        message: "contractId is required",
      },
    ],
  },
};

export const updateTermSchema = {
  termId: {
    rules: [
      {
        rule: (input) => !input,
        message: "termId is required",
      },
    ],
  },
  accept: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty(input),
        message: "accept is required",
      },
      {
        rule: (input) => input != "0" && input != "1" && input != "2",
        message: "accept of contractId is valid",
      },
    ],
  },
  value: {
    optional: true,
    rules: [
      {
        rule: async (input, { termId }) => {
          if (termId) {
            const term = await db.Term.findOne({
              where: { id: termId },
              include: [
                {
                  model: db.Contract,
                },
              ],
            });

            const termData = term.get({ plain: true });

            if (termData.type === "cost") {
              return !validator.isAlphanumeric(String(input));
            }
            if (termData.type === "timeStart") {
              return !moment(String(input), moment.ISO_8601, true).isValid();
            }
          }

          return false;
        },
        message: "value of contractId is valid",
      },
    ],
  },
};

export const deleteTermSchema = {
  termId: {
    rules: [
      {
        rule: (input) => !input,
        message: "termId is required",
      },
    ],
  },
};
