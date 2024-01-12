require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

console.log(process.env.ETHERSCAN_API_KEY);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  solidity: "0.8.19",
  settings: {
    optimizer: {
      enabled: true,
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.ETHERSCAN_API_KEY,
    },
  },
  networks: {
    localhost: {
      url: process.env.API_URL,
    },
    testnet: {
      url: process.env.API_URL_TESTNET,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY_METAMASK],
    },
  },
  sourcify: {
    enabled: true,
    // Optional: specify a different Sourcify server
    apiUrl: "https://sourcify.dev/server",
    // Optional: specify a different Sourcify repository
    browserUrl: "https://repo.sourcify.dev",
  },
};
