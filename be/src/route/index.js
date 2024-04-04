import { Router } from "express";
import { router as smartContract } from "./smartContract";
import { router as roomChat } from "./roomChat";
import { router as auth } from "./auth";
import { router as verify } from "./verify";
import { router as contract } from "./contract";
import { router as realEstate } from "./realEstate";
import { router as message } from "./message";
import { router as notify } from "./notify";
import { router as file } from "./file";
import { router as user } from "./user";
import { router as term } from "./term";
import { router as remind } from "./remind";

import { authenticate } from "../middleware/authenticate";
export const router = Router();

router.use("/smc", smartContract);

router.use("/room-chat", authenticate, roomChat);

router.use("/auth", auth);

router.use("/verify", verify);

router.use("/contract/", contract);

router.use("/real-estate", realEstate);

router.use("/message", authenticate, message);

router.use("/notify", authenticate, notify);

router.use("/file", authenticate, file);

router.use("/user", user);

router.use("/term", authenticate, term);

router.use("/remind", remind);
