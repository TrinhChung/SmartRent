import { Router } from "express";
import { router as smartContract } from "./smartContract";
import { router as roomChat } from "./roomChat";
import { router as auth } from "./auth";
import { router as verify } from "./verify";
import { router as bargain } from "./bargain";
import { router as realEstate } from "./realEstate";
import { router as message } from "./message";
import { authenticate } from "../middleware/authenticate";
export const router = Router();

router.use("/smc", smartContract);

router.use("/room-chat", authenticate, roomChat);

router.use("/auth", auth);

router.use("/verify", verify);

router.use("/bargain", bargain);

router.use("/real-estate", realEstate);

router.use("/message", authenticate, message);
