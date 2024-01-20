import { Router } from "express";
import { handleCreateBargain } from "../controllers/bargain";
export const router = Router();

router.post("/", handleCreateBargain);
