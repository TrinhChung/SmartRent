import { Router } from "express";
import { handleGetNotifyForMe, handleReadNotify } from "../controllers/notify";
import { readNotifySchema } from "../schema/notify";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();
export const router = Router();

router.get("/infor/", handleGetNotifyForMe);

router.post(
  "/read",
  schemaValidatorInstance.validateBody(readNotifySchema),
  handleReadNotify
);
