require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_API_KEY = process.env.SEPOLIA_API_KEY;
// const GOERLI_API_KEY = process.env.GOERLI_API_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.8" },
      { version: "0.8.9" },
      { version: "0.6.0" },
      { version: "0.8.21" },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      // polygon: POLYGONSCAN_API_KEY,
    },
  },

  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      blockConfirmations: 1,
    },
    // goerli: {
    //   url: GOERLI_API_KEY,
    //   accounts: [PRIVATE_KEY],
    //   chainId: 5,
    //   blockConfirmations: 6,
    // },
    sepolia: {
      chainId: 11155111,
      blockConfirmations: 6,
      url: SEPOLIA_API_KEY,
      accounts: [PRIVATE_KEY],
    },
  },
};
