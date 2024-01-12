import { ethers } from "ethers";
require("dotenv").config();
const {
  abi,
} = require("../../artifacts/contracts/contractApi.sol/SmartContract.json");

export const createContractInstanceSMC = () => {
  try {
    let apiUrl = process.env.API_URL;
    let privateKey = process.env.PRIVATE_KEY;

    if (process.env.NODE_ENV === "testnet") {
      console.log("Running testnet");
      apiUrl = process.env.API_URL_TESTNET;
      privateKey = process.env.PRIVATE_KEY_METAMASK;
    }

    /**Connect Smart Contract */
    const provider = new ethers.JsonRpcProvider(apiUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    const contractInstance = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      abi,
      signer
    );

    console.log(`Connect smart contract success in ${process.env.NODE_ENV}`);

    return contractInstance;
  } catch (error) {
    console.log(`Error creating contract instance ${process.env.NODE_ENV}`);
    console.log(error);
  }
};
