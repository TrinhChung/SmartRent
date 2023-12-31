import { Router } from "express";
import { ethers } from "ethers";
export const router = Router();

const provider = new ethers.JsonRpcProvider(process.env.API_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const {
  abi,
} = require("../../artifacts/contracts/contractApi.sol/SmartContract.json");
const contractInstance = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  signer
);

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const contract_sample = {
  id: 1,
  renterId: 1,
  sellerId: 2,
  rentCost: 300,
  duration: 1,
  timeStart: 100000,
  paymentDeadline: 100000,
  payment_type: "BNB",
  Term: [],
  renter: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  seller: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
};

router.post("/", async (req, res, next) => {
  try {
    const {
      id,
      renterId,
      sellerId,
      rentCost,
      duration,
      timeStart,
      paymentDeadline,
      payment_type,
      Term,
      renter,
      seller,
    } = req.body;
    const smartContract = await contractInstance.createSmartContract(
      id,
      renterId,
      sellerId,
      rentCost,
      duration,
      timeStart,
      paymentDeadline,
      payment_type,
      Term,
      renter,
      seller
    );

    return res.status(200).json({ status: 200, smartContract: smartContract });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: error });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const smartContracts = await contractInstance.getAllSmartContracts();
    return res
      .status(200)
      .json({ status: 200, smartContracts: smartContracts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: error });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params?.id ? req.params?.id : 1);
    const smartContract = await contractInstance.getSmartContractById(id);
    return res.status(200).json({ status: 200, smartContract: smartContract });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: error });
  }
});
