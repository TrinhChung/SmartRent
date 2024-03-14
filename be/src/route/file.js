import { Router } from "express";
import {
  handleGetFileUpload,
  handleUploadImage,
  handleUploadContact,
} from "../controllers/file";
import multer from "multer";
import { authenticate } from "../middleware/authenticate";
import { uploadContractSchema } from "../schema/file";

const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();
const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 10 * 1024 * 1024,
});

export const router = Router();
router.post("/upload/image", Multer.array("file", 5), handleUploadImage);

router.post(
  "/upload/contract",
  authenticate,
  schemaValidatorInstance.validateBody(uploadContractSchema),
  handleUploadContact
);

router.get("/upload/image", handleGetFileUpload);
