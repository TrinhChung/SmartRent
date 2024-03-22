import { Router } from "express";
import { viewRealEstateSchema } from "../schema/viewHistory";
import { handleViewRealEstate } from "../controllers/viewHistory";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/real-estate",
  schemaValidatorInstance.validateBody(viewRealEstateSchema),
  handleViewRealEstate
);
