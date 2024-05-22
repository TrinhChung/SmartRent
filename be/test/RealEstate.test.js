const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const hre = require("hardhat");
const { expect } = require("chai");

describe("RealEstate", () => {
  const beforeTest = async () => {
    const realEstate = await hre.ethers.deployContract(
      "contracts/RealEstate.sol:RealEstate"
    );

    await realEstate.waitForDeployment();

    const [deployer, sender] = await ethers.getSigners();
    return { deployer, realEstate, sender };
  };

  describe("Deployment", () => {
    it("Should set the right name", async () => {
      const { realEstate } = await loadFixture(beforeTest);
      expect(await realEstate.name()).to.equal("Real Estate");
    });
  });

  describe("Mint", () => {
    it("Should set the right uri", async () => {
      const { realEstate } = await loadFixture(beforeTest);
      const tokenURI = "Qmc7AAB2WT4gjDW4YRCR5SoYuSFJBG6mDTA7Jo7f2QsQ4m";
      const itemId = await realEstate.mint(Number(1), tokenURI);
      // console.log(itemId)
      expect(await realEstate.tokenURI(Number(1))).to.equal(tokenURI);
    });

    it("Should set the right owner", async () => {
      const { deployer, realEstate } = await loadFixture(beforeTest);
      const tokenURI = "Qmc7AAB2WT4gjDW4YRCR5SoYuSFJBG6mDTA7Jo7f2QsQ4m";
      const itemId = await realEstate.mint(Number(1), tokenURI);
      expect(await realEstate.ownerOf(Number(1))).to.equal(deployer.address);
    });
  });
});
