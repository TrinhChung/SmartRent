import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { handleBulkCreateRooms, handleGetRoomById } from "../controllers/room";

export const router = Router();

router.post("/bulk", authenticate, handleBulkCreateRooms);

router.get("/:id", handleGetRoomById);
