const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const hre = require("hardhat");
const { expect } = require('chai');

describe("SmartContract", () => {
    const beforeTest = async () => {
        const smartcontract = await hre.ethers.deployContract("contracts/SmartContract.sol:SmartContract");

        await smartcontract.waitForDeployment();
        const [deployer, sender] = await ethers.getSigners();
        const smartcontractURI = "Qmc7AAB2WT4gjDW4YRCR5SoYuSFJBG6mDTA7Jo7f2QsQ4m";
        const itemId = await smartcontract.mint(
            (1), // newItemId
            deployer.address,   // renter Address
            sender.address,     // seller Address
            Number(123),    // reId
            ethers.parseEther("1"),     //rent cost
            356,        // duration
            smartcontractURI,   //contract uri
        )
        // console.log(itemId);
        return {deployer, smartcontract, sender, itemId}
    };

    describe("Deployment", () => {
        it("Should return the right renter", async() => {
            const { deployer, smartcontract } = await loadFixture(beforeTest);
            const response = await smartcontract.getContract(1);
            // console.log(response);
            expect(response[0]).to.equal(deployer);
        })
        
        it("Should deposit all rent cost", async() => {
            const { smartcontract, deployer } = await loadFixture(beforeTest);
            await smartcontract.depositContract(1,{value: ethers.parseEther("5")});
            expect((await smartcontract.getbalanceOf(deployer))).to.equal(ethers.parseEther("4"));
            await smartcontract.depositContract(1, {value: ethers.parseEther("2")});
            expect(await smartcontract.getbalanceOf(deployer)).to.equal(ethers.parseEther("6"))
        })
        
        it("Should set the right deposit", async() => {
            const { smartcontract, deployer } = await loadFixture(beforeTest);
            expect(async () => await smartcontract.depositContract(1,{value: ethers.parseEther("0.5")})).to.be.revertedWith("Deposit not enough");
            await smartcontract.depositContract(1,{value: ethers.parseEther("1")});
            expect(await smartcontract.getDepositContractByRenter(Number(123), deployer.address)).to.equal(0)
        })
        
        it("should close contract", async() => {
            const { deployer,smartcontract } = await loadFixture(beforeTest);
            await deployer.sendTransaction({to: smartcontract.target, value: ethers.parseEther("5")})
            expect(await ethers.provider.getBalance(smartcontract.target)).to.equal(ethers.parseEther("5"));
            await smartcontract.close(deployer.address);
            expect(await ethers.provider.getBalance(smartcontract.target)).to.equal(0)
        })
    })
    
    describe("Transfer", () => {
        it("Should add liquid", async() => {
            const { smartcontract, deployer } = await loadFixture(beforeTest)
            await deployer.sendTransaction({to: smartcontract.target, value: ethers.parseEther("5")})

            expect((await smartcontract.getbalanceOf())).to.equal(ethers.parseEther("5"));

            await smartcontract.withdrawPositRenter(ethers.parseEther("1"));
            expect((await smartcontract.getbalanceOf())).to.equal(ethers.parseEther("4"));
        })

        it("Should add liquid 2", async() => {
            const { smartcontract, deployer } = await loadFixture(beforeTest)
            await deployer.sendTransaction({to: smartcontract.target, value: ethers.parseEther("5"), data: "0x1234"})
            expect(await smartcontract.getbalanceOf()).to.equal(ethers.parseEther("5"))
        })
        
    })

    describe("Payment", () => {
        it("Should pay rent cost", async() => {
            const { deployer,smartcontract } = await loadFixture(beforeTest);
            await deployer.sendTransaction({to: smartcontract.target, value: ethers.parseEther("5")})
            await smartcontract.payRentCost(1);
            expect(await smartcontract.getbalanceOf()).to.equal(ethers.parseEther("4"));
        })
        it("Should add duration", async() => {
            const { smartcontract } = await loadFixture(beforeTest);
            const response = await smartcontract.getContract(1);
            await smartcontract.renewal(123, 1);
            const afterRenewal = await smartcontract.getContract(1);
            expect(afterRenewal[4]).to.equal(Number(response[4]) + Number(123));
        })
    })
})