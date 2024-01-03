# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

Connect remix to localhost

```shell
connect remix to localhost
npx remixd

Compile contract
npx hardhat compile

deploy localhost
npx hardhat run --network localhost scripts/deploy.js

deploy bnb
npx hardhat run --network testnet scripts/deploy.js
```

create Private key for wallet

```shell
const wallet = ethers.Wallet.createRandom();
const privateKeyHex = wallet.privateKey;
```
