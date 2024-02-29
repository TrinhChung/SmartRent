import { Router } from "express";
import {
    getNotifyController,
    handleChangeReadState,
    handleCreatNotify,
} from "../controllers/notify"
import { authenticate } from "../middleware/authenticate";
export const router = Router();

router.get("/infor/", getNotifyController);

router.post("/", handleCreatNotify);

router.post("/read-state", handleChangeReadState)