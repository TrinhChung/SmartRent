import { Router } from "express";

export const router = Router();

router.use("/", (req, res, next) => {
  return res.status(200).json({ status: 200 });
});
