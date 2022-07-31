import { ethers } from "hardhat";

async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const nft = await MyNFT.deploy();

    await nft.deployed();

    const [owner] = await ethers.getSigners();
    for (let i = 0; i < 1_000; ++i) {
        nft.safeMint(owner.address);
    }

    console.log("MyNFT deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
