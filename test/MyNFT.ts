import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyNFT", function() {
    async function deployMyNFT() {
        const MyNFT = await ethers.getContractFactory("MyNFT");
        const nft = await MyNFT.deploy();
        return nft;
    }

    describe("Mint", function() {
        it("Should mint single MyNFT", async function() {
            const nft = await loadFixture(deployMyNFT);
            const [owner] = await ethers.getSigners();

            await nft.safeMint(owner.address);

            expect(await nft.balanceOf(owner.address)).to.equal(1);
            expect(await nft.tokenURI(0)).to.equal("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0");
        });
    });

});
