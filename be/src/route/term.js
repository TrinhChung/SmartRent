import { Router } from "express";
import {
  handleCreateTerm,
  handleUpdateTerm,
  handleDeleteTermContradiction,
} from "../controllers/term";
import {
  updateTermSchema,
  createTermOtherSchema,
  deleteTermSchema,
} from "../schema/term";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/new",
  schemaValidatorInstance.validateBody(createTermOtherSchema),
  handleCreateTerm
);

router.put(
  "/update",
  schemaValidatorInstance.validateBody(updateTermSchema),
  handleUpdateTerm
);

router.post(
  "/contradiction",
  schemaValidatorInstance.validateBody(deleteTermSchema),
  handleDeleteTermContradiction
);
