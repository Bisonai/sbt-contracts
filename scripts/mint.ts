import { ethers } from "hardhat";

async function main() {
    const nft = await ethers.getContractAt("MyNFT", "0xfb04B3Dbd08134d81b8e024ed2392997d6ec6a2D");

    const [owner] = await ethers.getSigners();
    for (let i = 0; i < 1_000; ++i) {
        console.log("Minting ", i)
        const tx = await nft.safeMint(owner.address);
        await tx.wait();
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
