import { Router } from "express";
import {
  handleCreateTerm,
  handleUpdateAcceptTerm,
  handleUpdateAcceptTimeStartTerm,
  handleUpdateTerm,
  handleUpdateValueCostTerm,
  handleUpdateValueTimeStartTerm,
} from "../controllers/term";
import {
  acceptCostTermSchema,
  acceptTimeStartTermSchema,
  createTermSchema,
  updateTermSchema,
  updateValueCostTermSchema,
  updateValueTimeStartTermSchema,
} from "../schema/term";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/new",
  schemaValidatorInstance.validateBody(createTermSchema),
  handleCreateTerm
);

router.put(
  "/update",
  schemaValidatorInstance.validateBody(updateTermSchema),
  handleUpdateTerm
);

router.put(
  "/cost-value/update",
  schemaValidatorInstance.validateBody(updateValueCostTermSchema),
  handleUpdateValueCostTerm
);

router.put(
  "/cost-accept/update",
  schemaValidatorInstance.validateBody(acceptCostTermSchema),
  handleUpdateAcceptTerm
);

router.put(
  "/time-start-value/update",
  schemaValidatorInstance.validateBody(updateValueTimeStartTermSchema),
  handleUpdateValueTimeStartTerm
);

router.put(
  "/time-start-accept/update",
  schemaValidatorInstance.validateBody(acceptTimeStartTermSchema),
  handleUpdateAcceptTimeStartTerm
);
