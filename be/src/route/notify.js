import { Router } from "express";
import {
    getNotifyController,
    handleUpsertMessageNotify,
} from "../controllers/notify"
import { authenticate } from "../middleware/authenticate";
export const router = Router();

router.get("/infor/", getNotifyController);

router.post("/", handleUpsertMessageNotify);