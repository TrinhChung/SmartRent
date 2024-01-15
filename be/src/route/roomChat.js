import { Router } from "express";
import { getRoomChatController } from "../controllers/roomChat";
export const router = Router();

router.get("/:id", getRoomChatController);
