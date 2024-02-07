import { Router } from "express";
import {
  handleCreateRealEstate,
  handleGetRealEstate,
} from "../controllers/realEstate";
import {
  createRealEstateSchema,
  getRealEstateFullHouseSchema,
} from "../schema/realEstate";
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

router.get(
  "/full-house/:id",
  authenticate,
  schemaValidatorInstance.validateParams(getRealEstateFullHouseSchema),
  handleGetRealEstate
);
