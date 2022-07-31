import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

const commonConfig = {
    gas: 5_000_000,
    accounts: {
        mnemonic: process.env.MNEMONIC || ""
    }
}


const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        localhost: {
            gas: 1_400_000,
        },
        baobab: {
            url: "https://api.baobab.klaytn.net:8651",
            // url: 'https://public-node-api.klaytnapi.com/v1/baobab',
            ...commonConfig,
            gasPrice: 250_000_000_000
        },
    }
}

task("address", "Convert mnemonic to address")
    .addParam("mnemonic", "The account's mnemonic")
    .setAction(async (taskArgs, hre) => {
        const something = hre.ethers.Wallet.fromMnemonic(taskArgs.mnemonic);
        console.log(something.address);
    });

task("balance", "Prints an account's balance")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs, hre) => {
        const account = hre.web3.utils.toChecksumAddress(taskArgs.account);
        const balance = await hre.web3.eth.getBalance(account);
        console.log(hre.web3.utils.fromWei(balance, "ether"), "ETH");
    });

export default config;
