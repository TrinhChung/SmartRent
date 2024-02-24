import { Router } from "express";
import { handleUpdateUserInfo } from "../controllers/user";
import { authenticate } from "../middleware/authenticate";
import { updateUserInfoSchema } from "../schema/user";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.put(
  "/info",
  authenticate,
  schemaValidatorInstance.validateBody(updateUserInfoSchema),
  handleUpdateUserInfo
);
