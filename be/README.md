# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Config BE
Create file .env from .env.example

Migrate Database

```shell
npx sequelize-cli db:migrate
```

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
```

Compile contract

```shell
npx hardhat compile
```

Deploy localhost

```shell
deploy localhost
npx hardhat run --network localhost scripts/deploy.js
```

Deploy BNB network

```shell
deploy bnb
npx hardhat run --network testnet scripts/deploy.js
```

Verify Smart Contract 
```shell
network=NAME_NETWORK ./verify.sh

example
network=testnet ./verify.sh
```

Create Private key for wallet

```shell
const wallet = ethers.Wallet.createRandom();
const privateKeyHex = wallet.privateKey;
```

remove

```shell
npx sequelize-cli db:migrate:undo:all
```

seed

```shell
npx sequelize-cli db:seed:all
```
