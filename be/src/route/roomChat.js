import { Router } from "express";
import {
  getRoomChatController,
  handleCreateRoomChat,
} from "../controllers/roomChat";
export const router = Router();

router.get("/:id", getRoomChatController);

router.post("/", handleCreateRoomChat);
