import { checkUserEmail, checkUserIsActive } from "../utils/validatorDb";

const validator = require("validator");

export const signUpSchema = {
  email: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Email address is required",
      },
      {
        rule: (input) => !validator.isEmail(input),
        message: "This is not a valid email address",
      },
      {
        rule: async (input) => await checkUserEmail(input),
        message: "This email is existing",
      },
    ],
  },
  lastName: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "LastName is required",
      },
    ],
  },
  firstName: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "firstName is required",
      },
    ],
  },
  passwordConfirm: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "passwordConfirm is required",
      },
    ],
  },
  password: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "password is required",
      },
      {
        rule: (input, { passwordConfirm }) => input !== passwordConfirm,
        message: "This password and password confirm must equal",
      },
      // {
      //   rule: (input) => !validator.isStrongPassword(input),
      //   message: "This password is not strong enough",
      // },
    ],
  },
};

export const loginSchema = {
  email: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "Email address is required",
      },
      {
        rule: (input) => !validator.isEmail(input),
        message: "This is not a valid email address",
      },
      {
        rule: async (input) => !(await checkUserIsActive(input)),
        message: "Account not exist or not active",
      },
    ],
  },

  password: {
    rules: [
      {
        rule: (input) => !input || validator.isEmpty("input"),
        message: "password is required",
      },
    ],
  },
};
