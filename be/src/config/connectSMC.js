import { ethers } from "ethers";
import { abi as reAbi } from "../../artifacts/contracts/RealEstate.sol/RealEstate.json";
require("dotenv").config();
const {
  abi,
} = require("../../artifacts/contracts/contractApi.sol/SmartContract.json");

export const createContractInstanceSMC = (address) => {
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

    const contractInstance = new ethers.Contract(address, abi, signer);

    return contractInstance;
  } catch (error) {
    console.log(`Error creating contract instance ${process.env.NODE_ENV}`);
    console.log(error);
  }
};

export const createReInstanceSMC = (address) => {
  try {
    let apiUrl = process.env.API_URL;
    let privateKey = process.env.PRIVATE_KEY;

    if (process.env.NODE_ENV === "testnet") {
      console.log("Create Real Estate Instance");
      apiUrl = process.env.API_URL_TESTNET;
      privateKey = process.env.PRIVATE_KEY_METAMASK;
    }

    /**Connect Smart Contract */
    const provider = new ethers.JsonRpcProvider(apiUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    const contractInstance = new ethers.Contract(address, reAbi, signer);

    return contractInstance;
  } catch (error) {
    console.log(`Error creating contract instance ${process.env.NODE_ENV}`);
    console.log(error);
  }
};
