import { Router } from "express";
import {
  handleCreateBargain,
  handleCloseBargain,
  handleGetBargainForMe,
} from "../controllers/bargain";
import { authenticate } from "../middleware/authenticate";
import { closeBargainSchema, createBargainSchema } from "../schema/bargain";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/",
  authenticate,
  schemaValidatorInstance.validateBody(createBargainSchema),
  handleCreateBargain
);

router.post(
  "/close",
  authenticate,
  schemaValidatorInstance.validateBody(closeBargainSchema),
  handleCloseBargain
);

router.get("/me", authenticate, handleGetBargainForMe);
