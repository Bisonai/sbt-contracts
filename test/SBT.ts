import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { PromiseOrValue } from "../typechain-types/common";
import { SBT } from "../typechain-types/contracts/SBT";

describe("MySBT", async function() {
    async function deployMySBT() {
        const MySBT = await ethers.getContractFactory("SBT");
        const sbtName = "SBT";
        const sbtSymbol = "SBT";
        const baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
        const sbt = await MySBT.deploy(sbtName, sbtSymbol, baseURI);;
        //const nft = await MyNFT.deploy();
        return sbt;
    }

    describe("Test", function() {
        var sbt: SBT
        it("#1 Should mint single MyNFT", async function() {
            sbt = await loadFixture(deployMySBT);
            const [owner] = await ethers.getSigners()
            await sbt.safeMint(owner.address);

            expect(await sbt.balanceOf(owner.address)).to.equal(1);
            expect(await sbt.tokenURI(0)).to.equal("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0");
        });

        it("#2 Locked status should be True", async function() {
            const lockStatus = await sbt.locked(0)
            expect(lockStatus == true);
        });

        it("#3 Transfer should revert", async function() {
            const [owner, account1] = await ethers.getSigners()
            await expect(
                sbt.transferFrom(owner.address, account1.address, 0)
              ).to.be.reverted
        });

    });

});
