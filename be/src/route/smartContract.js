import { Router } from "express";
import { handleCreateContract } from "../controllers/smartcontract";
import { ethers } from "ethers";

export const router = Router();

const provider = new ethers.JsonRpcProvider(process.env.API_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

router.use("/", (req, res, next) => {
  return res.status(200).json({ status: 200 });
});

router.use("/test", handleCreateContract);
