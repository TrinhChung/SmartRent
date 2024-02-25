import { Router } from "express";
import {
  handleChangePassword,
  handleUpdateUserInfo,
} from "../controllers/user";
import { authenticate } from "../middleware/authenticate";
import { changePasswordSchema, updateUserInfoSchema } from "../schema/user";
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
  "/change-password",
  authenticate,
  schemaValidatorInstance.validateBody(changePasswordSchema),
  handleChangePassword
);

router.post(
  "/request-forgot-password",
  schemaValidatorInstance.validateBody(changePasswordSchema),
  handleChangePassword
);
