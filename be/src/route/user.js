import { Router } from "express";
import {
  handleChangePassword,
  handleUpdateUserInfo,
  handleRequestForgotPassword,
  handleResetPassword,
  handleUpdateWallet,
} from "../controllers/user";
import { authenticate } from "../middleware/authenticate";
import {
  changePasswordSchema,
  updateUserInfoSchema,
  requestForgotPasswordSchema,
  resetPasswordSchema,
  updateWalletSchema,
} from "../schema/user";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.put(
  "/info",
  authenticate,
  schemaValidatorInstance.validateBody(updateUserInfoSchema),
  handleUpdateUserInfo
);

router.put(
  "/update-wallet",
  authenticate,
  schemaValidatorInstance.validateBody(updateWalletSchema),
  handleUpdateWallet
);

router.put(
  "/change-password",
  authenticate,
  schemaValidatorInstance.validateBody(changePasswordSchema),
  handleChangePassword
);

router.post(
  "/request-forgot-password",
  schemaValidatorInstance.validateBody(requestForgotPasswordSchema),
  handleRequestForgotPassword
);

router.put(
  "/reset-password",
  schemaValidatorInstance.validateBody(resetPasswordSchema),
  handleResetPassword
);
