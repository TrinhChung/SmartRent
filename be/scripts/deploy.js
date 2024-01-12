// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { setEnv } = require("./setEnv.js");

async function main() {
  const contractApi = await hre.ethers.deployContract("SmartContract");

  await contractApi.waitForDeployment();

  if (contractApi.target) {
    // shell.env["CONTRACT_ADDRESS"] = contractApi.target;
    setEnv("CONTRACT_ADDRESS", contractApi.target);
    console.log("Contract address: ", contractApi.target);
  } else {
    console.log("Contract address is not available");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
