// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { setEnv } = require("./setEnv.js");
const { handleTokenUris } = require("../src/utils/uploadPinata.js")

async function main() {
  const realEstate = await hre.ethers.deployContract(
    "contracts/RealEstate.sol:RealEstate"
  );

  await realEstate.waitForDeployment();

  if (realEstate.target) {
    // shell.env["CONTRACT_ADDRESS"] = contractApi.target;
    setEnv("RE_ADDRESS", realEstate.target);
    console.log("Real Estate address: ", realEstate.target);
  } else {
    console.log("Real Estate address is not available");
  }

  const contractApi = await hre.ethers.deployContract(
    "contracts/contractApi.sol:SmartContract"
  );

  await contractApi.waitForDeployment();
  let tokenUris;
  tokenUris = await handleTokenUris()

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

