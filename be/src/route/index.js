import { Router } from "express";
import { router as smartContract } from "./smartContract";
export const router = Router();

router.use("/smc", smartContract);

router.use("/", (req, res, next) => {
  return res.status(200).json({ status: 200 });
});
