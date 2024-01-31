import { Router } from "express";
import { vndToWei } from "../utils/convertMoney";
import { createContractInstanceSMC } from "../config/connectSMC";
export const router = Router();
require("dotenv").config();

// const contractInstance = createContractInstanceSMC();
const contractInstance = null;
BigInt.prototype.toJSON = function () {
  return this.toString();
};

router.post("/smart-contract", async (req, res, next) => {
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

router.get("/smart-contract/", async (req, res, next) => {
  try {
    const smartContracts = await contractInstance.getAllSmartContracts();
    return res
      .status(200)
      .json({ status: 200, smartContracts: smartContracts });
  } catch (error) {
    console.log("error get smart contract");
    return res.status(500).json({ status: 500, error: error });
  }
});

router.get("/smart-contract/:id", async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params?.id ? req.params?.id : 1);
    const smartContract = await contractInstance.getSmartContractById(id);
    return res.status(200).json({ status: 200, smartContract: smartContract });
  } catch (error) {
    console.log("error get smart contract by id");
    return res.status(500).json({ status: 500, error: error });
  }
});

router.get("/payment/:id", async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params?.id ? req.params?.id : 1);

    return res.status(200).json({ status: id, balance: null });
  } catch (error) {
    console.log("error get payment by id");
    return res.status(500).json({ status: 500, error: error });
  }
});

router.get("/vnd-to-ether", async (req, res, next) => {
  const test = await vndToWei(65329379.78);
  return res.status(200).json({ test: test });
});

router.post("/close/contract", async (req, res, next) => {
  const data = req.body;
  if (!data.address) {
    return res.status(404).json({ msgError: "Address not empty" });
  } else {
    const resData = await contractInstance.close(data.address);
    res.status(200).json({ data: resData });
  }
});

router.post("/smart-contract/person", async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.address) {
      return res.status(404).json({ msgError: "Address not empty" });
    } else {
      const person = await contractInstance.getPersonByAddress(data.address);
      res.status(200).json({ person: person });
    }
  } catch (error) {
    console.log("get person by address");
    return res.status(500).json({ status: 500, error: error });
  }
});
