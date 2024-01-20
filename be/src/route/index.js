import { Router } from "express";
import { router as smartContract } from "./smartContract";
import { router as roomChat } from "./roomChat";
export const router = Router();

router.use("/smc", smartContract);

router.use("/room-chat", roomChat);
