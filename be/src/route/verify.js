import { Router } from "express";
import { verifyAccountController } from "../controllers/verify";
import { verifyAccountSchema } from "../schema/verify";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();
export const router = Router();

router.get(
  "/account/:token",
  schemaValidatorInstance.validateParams(verifyAccountSchema),
  verifyAccountController
);
