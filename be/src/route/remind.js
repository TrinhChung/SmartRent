import { Router } from "express";
import { handleGetUserPayment } from "../controllers/remind";
export const router = Router();

router.get("/", handleGetUserPayment);