import { Router } from "express";
import { handleCreateRealEstate } from "../controllers/realEstate";
import { createRealEstateSchema } from "../schema/realEstate";
import { authenticate } from "../middleware/authenticate";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

// TODO: only allow seller create
router.post(
  "/full-house",
  authenticate,
  schemaValidatorInstance.validateBody(createRealEstateSchema),
  handleCreateRealEstate
);
