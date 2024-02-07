import { Router } from "express";
import {
  handleBulkCreateFloors,
  handleGetFloorById,
} from "../controllers/floor";
import { authenticate } from "../middleware/authenticate";
import { bulkCreateFloorsSchema } from "../schema/floor";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/bulk",
  authenticate,
  schemaValidatorInstance.validateBody(bulkCreateFloorsSchema),
  handleBulkCreateFloors
);

router.get("/:id", authenticate, handleGetFloorById);
