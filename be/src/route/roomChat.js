import { Router } from "express";
import {
  getRoomChatController,
  handleChangeNameRoomChat,
  handleCreateRoomChat,
  handleGetRoomChatForMe,
} from "../controllers/roomChat";
import { roomPermission } from "../middleware/roomChat";
import { changeNameRoomChatSchema } from "../schema/roomChat";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();
export const router = Router();

router.get("/info/:id", getRoomChatController);

router.post("/", handleCreateRoomChat);

router.get("/me", handleGetRoomChatForMe);

router.post(
  "/change-name",
  roomPermission,
  schemaValidatorInstance.validateBody(changeNameRoomChatSchema),
  handleChangeNameRoomChat
);
