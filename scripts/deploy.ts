import { ethers } from "hardhat";

async function main() {
    const MySBT = await ethers.getContractFactory("SBT");
    const sbtName = "SBT";
    const sbtSymbol = "SBT";
    const baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    const sbt = await MySBT.deploy(sbtName, sbtSymbol, baseURI);

    await sbt.deployed();
    console.log("MySBT deployed to:", sbt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
