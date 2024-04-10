const hre = require("hardhat");
const { expect } = require('chai');
const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("ContractApi", function () {

    async function beforeEach() {    
        const contractApi = await hre.ethers.deployContract("contracts/contractApi.sol:SmartContract");

        await contractApi.waitForDeployment();

        const [deployer, sender, sender2] = await ethers.getSigners();

        // fallback = await ethers.getContract("SmartContract", deployer)

        return {deployer, contractApi, sender, sender2}
    };

    describe("Deployment", function () {
        // it("Should set the right owner", async () => {
        //     const { deployer, contractApi } = await loadFixture(beforeEach);
        //     expect(await contractApi.getMe()).to.equal(deployer.address);
        // })
        it("Should set the right address", async () => {
            const { contractApi } = await loadFixture(beforeEach);
            expect(await contractApi.getAddressContract()).to.equal(contractApi.target);
        })
        it("Should set the right balance", async () => {
            const { contractApi } = await loadFixture(beforeEach);
            expect(await contractApi.getContractBalance()).to.equal(await ethers.provider.getBalance(contractApi.target));
        })
    })
    
    describe("receive", async () => {
        it("should update person balance on receive", async function () {
            const { contractApi, sender } = await loadFixture(beforeEach);

            // Send Ether to the contract using a simple Ether transfer without data
            await sender.sendTransaction({ to: contractApi.target, value: ethers.parseEther("1") })

            expect((await contractApi.getPersonByAddress(sender.address)).balance).to.equal(ethers.parseEther("1"));
            await sender.sendTransaction({ to: contractApi.target, value: ethers.parseEther("1") })
            expect((await contractApi.getPersonByAddress(sender.address)).balance).to.equal(ethers.parseEther("2"));
        })

        it("should add person balance on receive", async function () {
            const { contractApi, deployer } = await loadFixture(beforeEach);

            // Send Ether to the contract using a simple Ether transfer without data
            await deployer.sendTransaction({ to: contractApi.target, value: ethers.parseEther("5") })
            await deployer.sendTransaction({ to: contractApi.target, value: ethers.parseEther("5") })

            expect((await contractApi.getPersonByAddress(deployer.address)).balance).to.equal(ethers.parseEther("10"));
        });

        it("should emit log event when receiving Ether", async function () {
            const { contractApi, sender } = await loadFixture(beforeEach);

            // Send Ether to the contract using a simple Ether transfer
            await sender.sendTransaction({ to: contractApi.target, value: ethers.parseEther("1") })

            // Check if the Log event was emitted with the correct data
            const logs = await contractApi.queryFilter("log")
            expect(logs.length).to.equal(1)
            const log = logs[0]
            expect(log.args.message).to.equal("Receive receive token")
            expect(log.args._address).to.equal(sender.address)   
        })
    })

    describe("CreatSmartContract", async () => {
        it("should create a smart contract", async function () {
            const { deployer, contractApi , sender } = await loadFixture(beforeEach)
            await deployer.sendTransaction({ to: contractApi.target, value: ethers.parseEther("10") })
            await sender.sendTransaction({ to: contractApi.target, value: ethers.parseEther("10") })

            await contractApi.createSmartContract(
                1,
                deployer.address,
                sender.address,
                1, // rentCost
                30, // duration
                0, // timeStart
                30, // paymentDeadline
                "Monthly",
                []
            )
                
            const smartContract = await contractApi.getSmartContractById(1);
            expect(smartContract.id).to.equal(1);
            expect(smartContract.renter).to.equal(deployer.address);
            expect(smartContract.seller).to.equal(sender.address);
        });
        
        it("should revert with insufficient balance", async function () {
            const { deployer, contractApi , sender } = await loadFixture(beforeEach)
            expect(async () =>
            await contractApi.createSmartContract(
                1,
                deployer.address,
                sender.address,
                100,
                30, // duration
                0, // timeStart
                30, // paymentDeadline
                "Monthly",
                []
              )
            ).to.be.revertedWith("Insufficient balance");
        });
    })

    describe("transferETH", async () => {
        it("should transfer ETH from renter to seller", async function () {
            // Set up a contract and persons for testing
            const { deployer, contractApi , sender } = await loadFixture(beforeEach)
            await deployer.sendTransaction({ to: contractApi.target, value: ethers.parseEther("10") })
            await sender.sendTransaction({ to: contractApi.target, value: ethers.parseEther("10") })

            await contractApi.createSmartContract(
              1,
              deployer.address,
              sender.address,
              ethers.parseEther("1"), // rentCost
              30, // duration
              0, // timeStart
              30, // paymentDeadline
              "Monthly",
              [] // Empty term array for simplicity
            );
        
            // Initial balances
            const initialRenterBalance = await ethers.provider.getBalance(deployer.address) 
            const initialSellerBalance = await ethers.provider.getBalance(sender.address)
        
            // Call the transferETH function
            await contractApi.transferETH(1, { value: ethers.parseEther("1") })
        
            // Updated balances
            const updatedRenterBalance = await ethers.provider.getBalance(deployer.address)
            const updatedSellerBalance = await ethers.provider.getBalance(sender.address)
        
            // Check if the renter's balance is decreased by rentCost
            // expect(updatedRenterBalance).to.equal(initialRenterBalance - (await ethers.parseEther("1")));
        
            // Check if the seller's balance is increased by rentCost
            expect(updatedSellerBalance).to.equal(initialSellerBalance + (await ethers.parseEther("1")));
          });
    })

    describe("close address", async () => {
        // it("should close smart contract", async () => {
        //     const { contractApi, sender } = await loadFixture(beforeEach);

        //     // Send Ether to the contract using a simple Ether transfer without data
        //     await sender.sendTransaction({ to: contractApi.target, value: ethers.parseEther("1") })

        //     expect((await contractApi.getPersonByAddress(sender.address)).balance).to.equal(ethers.parseEther("1"));
        //     await contractApi.close(contractApi.getMe())

        //     expect(await contractApi.getContractBalance()).to.equal(0);
        // })
        it("should not close smart contract", async () => {
            const { contractApi, sender, deployer } = await loadFixture(beforeEach);

            // Send Ether to the contract using a simple Ether transfer without data
            await sender.sendTransaction({ to: contractApi.target, value: ethers.parseEther("1") })

            expect((await contractApi.getPersonByAddress(sender.address)).balance).to.equal(ethers.parseEther("1"));
            await contractApi.close(deployer.address)

            expect((await contractApi.getPersonByAddress(sender.address)).balance).to.equal(ethers.parseEther("1"));
        })
    })


})