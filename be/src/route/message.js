import { Router } from "express";
import {
  handleCreateMessage,
  handleGetMessageByRoomId,
} from "../controllers/message";
import { createMessageSchema } from "../schema/message";
import { roomPermission } from "../middleware/roomChat";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

router.post(
  "/",
  schemaValidatorInstance.validateBody(createMessageSchema),
  roomPermission,
  handleCreateMessage
);

router.get("/", handleGetMessageByRoomId);
