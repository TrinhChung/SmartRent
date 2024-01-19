import { Router } from "express";
import { router as smartContract } from "./smartContract";
import { router as roomChat } from "./roomChat";
import { router as auth } from "./auth";

export const router = Router();

router.use("/smc", smartContract);

router.use("/room-chat", roomChat);

router.use("/auth", auth);
