import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { PromiseOrValue } from "../typechain-types/common";
import { SBT } from "../typechain-types";

let sbt: SBT
describe("MySBT", async function() {
    beforeEach(async () => {
        const MySBT = await ethers.getContractFactory("SBT");
        const sbtName = "SBT";
        const sbtSymbol = "SBT";
        const baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
        sbt = await MySBT.deploy(sbtName, sbtSymbol, baseURI);
    })
    
    it("#1 Should mint single MyNFT", async function() {
        const [owner, account1] = await ethers.getSigners()
        await sbt.safeMint(owner.address);

        expect(await sbt.balanceOf(owner.address)).to.equal(1);
        expect(await sbt.tokenURI(0)).to.equal("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0");
    });

    it("#2 Locked status should be True", async function() {
        const [owner, account1] = await ethers.getSigners()
        await sbt.safeMint(owner.address);

        const lockStatus = await sbt.locked(0)
        expect(lockStatus == true);
    });

    it("#3 transferFrom should revert", async function() {
        const [owner, account1] = await ethers.getSigners()
        await sbt.safeMint(owner.address);

        await expect(
            sbt.transferFrom(owner.address, account1.address, 0)
            ).to.be.reverted
    });

    it("#4 safeTransferFrom(address,address,uint256) should revert", async function() {
        const [owner, account1] = await ethers.getSigners()
        await expect(
            sbt["safeTransferFrom(address,address,uint256)"](owner.address, account1.address, 0)
            ).to.be.reverted
    });
    
    it("#5 safeTransferFrom(address,address,uint256,bytes) should revert", async function() {
        const [owner, account1] = await ethers.getSigners()
        await expect(
            sbt["safeTransferFrom(address,address,uint256,bytes)"](owner.address, account1.address, 0, [])
            ).to.be.reverted
    });

});
