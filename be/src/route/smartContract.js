import { Router } from "express";
import { handleCreateContract } from "../controllers/smartcontract";

export const router = Router();

router.use("/", (req, res, next) => {
  return res.status(200).json({ status: 200 });
});

router.use("/test", handleCreateContract);
