import { Router } from "express";
import { handleCreateRealEstate } from "../controllers/realEstate";
import { createRealEstateSchema } from "../schema/realEstate";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/",
  schemaValidatorInstance.validateBody(createRealEstateSchema),
  handleCreateRealEstate
);
