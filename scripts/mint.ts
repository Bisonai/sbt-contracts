import { ethers } from "hardhat";

async function main() {
    const sbt = await ethers.getContractAt("SBT", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");

    const [owner] = await ethers.getSigners();
    for (let i = 0; i < 1; ++i) {
        console.log("Minting ", i)
        const tx = await sbt.safeMint(owner.address, 0);
        await tx.wait();
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
