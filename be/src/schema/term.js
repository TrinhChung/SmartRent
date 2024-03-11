const validator = require("validator");
const moment = require("moment");

export const createTermSchema = {
  value: {
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
        message: "contractId is required",
      },
      {
        rule: (input) => input != "1" && input != "2",
        message: "value of contractId is valid",
      },
    ],
  },
};

export const updateValueCostTermSchema = {
  costId: {
    rules: [
      {
        rule: (input) => !input,
        message: "costId is required",
      },
    ],
  },
  value: {
    rules: [
      {
        rule: (input) => !input && input < 0,
        message: "contractId is required",
      },
    ],
  },
};

export const acceptCostTermSchema = {
  costId: {
    rules: [
      {
        rule: (input) => !input,
        message: "costId is required",
      },
    ],
  },
  accept: {
    rules: [
      {
        rule: (input) => !input,
        message: "contractId is required",
      },
      {
        rule: (input) => input != true && input != false,
        message: "value of cost is valid",
      },
    ],
  },
};

export const updateValueTimeStartTermSchema = {
  timeStartId: {
    rules: [
      {
        rule: (input) => !input,
        message: "timeStartId is required",
      },
    ],
  },
  value: {
    rules: [
      {
        rule: (input) => !input && validator.isDate,
        message: "contractId is required",
      },
      {
        rule: (input) => !moment(input, moment.ISO_8601, true).isValid(),
        message: "value of time start is valid",
      },
    ],
  },
};

export const acceptTimeStartTermSchema = {
  timeStartId: {
    rules: [
      {
        rule: (input) => !input,
        message: "timeStartId is required",
      },
    ],
  },
  accept: {
    rules: [
      {
        rule: (input) => !input,
        message: "contractId is required",
      },
      {
        rule: (input) => input != true && input != false,
        message: "value of cost is valid",
      },
    ],
  },
};
