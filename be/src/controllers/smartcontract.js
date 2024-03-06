import { createReInstanceSMC } from "../config/connectSMC";
import { abi as abiRe } from "../../artifacts/contracts/RealEstate.sol/RealEstate.json";
const hre = require("hardhat");
require("dotenv").config();

export const handleCreateContract = async (req, res, next) => {
  try {
    return res.status(200).json({ status: 1 });
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateRealEstate = async (req, res, next) => {
  try {
    const uri = req.body.uri;
    const reInstance = createReInstanceSMC(process.env.RE_ADDRESS);
    const transaction = await reInstance.mint(uri);
    console.log(transaction);
    return res.status(200).json({ message: "Create real estate successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const handleGetRealEstateSc = async (req, res, next) => {
  try {
    const id = req.params.id;
    const reInstance = createReInstanceSMC(process.env.RE_ADDRESS);
    var re = await reInstance.tokenURI(id);
    return res
      .status(200)
      .json({ message: "Get real estate successfully", data: re });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const handleGetOwnerOfRealEstateSc = async (req, res, next) => {
  try {
    const id = req.params.id;
    const reInstance = createReInstanceSMC(process.env.RE_ADDRESS);
    var address = await reInstance.ownerOf(id);
    return res
      .status(200)
      .json({ message: "Get real estate successfully", data: address });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const handleGetReAddressSc = async (req, res, next) => {
  try {
    const reAddress = process.env.RE_ADDRESS;
    if (!reAddress) {
      return res.status(404).json({ message: "Chưa deploy code" });
    }
    return res
      .status(200)
      .json({ message: "Get real estate successfully", data: reAddress });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const handleGetAbiReSc = async (req, res, next) => {
  try {
    const abi = abiRe;
    if (!abi) {
      return res.status(404).json({ message: "Chưa deploy code" });
    }
    return res
      .status(200)
      .json({ message: "Get abi real estate successfully", data: abi });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};
