import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { initContractSchema, signContractSchema } from "../schema/contract";
import { uploadContractSchema } from "../schema/file";
import {
  handleCloseContract,
  handleGetContractById,
  handleGetContractForMe,
  handleInitContract,
  handleSignContract,
  handleCreateSc,
  handleUploadToIpfs,
} from "../controllers/contract";
import { roomPermission } from "../middleware/roomChat";
import { handleRenterPaymentSmartContract } from "../controllers/realEstate";
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

router.post(
  "/uploadIpfs",
  authenticate,
  schemaValidatorInstance.validateBody(uploadContractSchema),
  handleUploadToIpfs
);

router.post(
  "/deposit/smart-contract",
  authenticate,
  schemaValidatorInstance.validateBody(signContractSchema),
  handleRenterPaymentSmartContract
);
