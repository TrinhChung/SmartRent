import { Router } from "express";
import { handleCreateBargain } from "../controllers/bargain";
import { authenticate } from "../middleware/authenticate";
import { createBargainSchema } from "../schema/bargain";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/",
  authenticate,
  schemaValidatorInstance.validateBody(createBargainSchema),
  handleCreateBargain
);
