import { ethers } from "hardhat";

async function main() {
    const sbt = await ethers.getContractAt("SBT", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    const [owner] = await ethers.getSigners();
    for (let i = 0; i < 1; ++i) {
        console.log("Minting ", i)
        const tx = await sbt.safeMint(owner.address);
        await tx.wait();
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
