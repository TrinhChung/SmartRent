import { ethers } from "ethers";
require("dotenv").config();
const {
  abi,
} = require("../../artifacts/contracts/contractApi.sol/SmartContract.json");

export const createContractInstanceSMC = () => {
  try {
    /**Connect Smart Contract */
    const provider = new ethers.JsonRpcProvider(process.env.API_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contractInstance = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      abi,
      signer
    );
    console.log("Connect smart contract success");
    return contractInstance;
  } catch (error) {
    console.log("Error creating contract instance");
  }
};
