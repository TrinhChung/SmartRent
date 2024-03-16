import { Router } from "express";
import { createContractInstanceSMC } from "../config/connectSMC";
import {
  handleCreateRealEstate,
  handleGetRealEstateSc,
  handleGetOwnerOfRealEstateSc,
  handleGetReAddressSc,
  handleGetAbiReSc,
  handleGetScAddressSc,
  handleGetAbiSc,
} from "../controllers/smartcontract";
import { authenticate } from "../middleware/authenticate";
require("dotenv").config();

export const router = Router();
const contractInstance = createContractInstanceSMC(
  process.env.CONTRACT_ADDRESS
);

BigInt.prototype.toJSON = function () {
  return this.toString();
};

router.post("/real-estate/", authenticate, handleCreateRealEstate);

router.get("/real-estate/:id", handleGetRealEstateSc);

router.get("/owner-of-re/:id", handleGetOwnerOfRealEstateSc);

router.get("/re-address", handleGetReAddressSc);

router.get("/sc-address", handleGetScAddressSc);

router.get("/re-abi", handleGetAbiReSc);

router.get("/sc-abi", handleGetAbiSc);

router.post("/smart-contract", authenticate, async (req, res, next) => {
  try {
    const {
      id,
      renterAddress,
      sellerAddress,
      rentCost,
      duration,
      timeStart,
      paymentDeadline,
      payment_type,
      Term,
    } = req.body;
    const smartContract = await contractInstance.createSmartContract(
      id,
      renterAddress,
      sellerAddress,
      rentCost,
      duration,
      timeStart,
      paymentDeadline,
      payment_type,
      Term
    );

    return res.status(200).json({ status: 200, smartContract: smartContract });
  } catch (error) {
    console.log("error create smart contract");
    return res.status(500).json({ status: 500, error: error });
  }
});
