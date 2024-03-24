import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import {
  cancelContractSchema,
  initContractSchema,
  signContractSchema,
} from "../schema/contract";
import {
  handleCloseContract,
  handleGetContractById,
  handleGetContractForMe,
  handleInitContract,
  handleSignContract,
  handleCreateSc,
} from "../controllers/contract";
import { roomPermission } from "../middleware/roomChat";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/",
  authenticate,
  schemaValidatorInstance.validateBody(initContractSchema),
  handleInitContract
);

router.post(
  "/close",
  authenticate,
  roomPermission,
  schemaValidatorInstance.validateBody(signContractSchema),
  handleCloseContract
);

router.get("/me", authenticate, handleGetContractForMe);

router.get("/detail/:id", authenticate, handleGetContractById);

router.put(
  "/sign",
  authenticate,
  schemaValidatorInstance.validateBody(signContractSchema),
  handleSignContract
);

router.post(
  "/create/smart-contract",
  authenticate,
  schemaValidatorInstance.validateBody(signContractSchema),
  handleCreateSc
);
