import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { PromiseOrValue } from "../typechain-types/common";
import { SBT } from "../typechain-types";

let sbt: SBT
const baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
let owner: { address: PromiseOrValue<string>; }, account1: { address: PromiseOrValue<string>; };
describe("MySBT", async function() {
    beforeEach(async () => {
        const MySBT = await ethers.getContractFactory("SBT");
        const sbtName = "SBT";
        const sbtSymbol = "SBT";
        sbt = await MySBT.deploy(sbtName, sbtSymbol, baseURI);
        [owner, account1] = await ethers.getSigners();
    })
    
    it("#1 Should mint single MyNFT", async function() {         
        await sbt.safeMint(owner.address);

        expect(await sbt.balanceOf(owner.address)).to.equal(1);
        expect(await sbt.tokenURI(0)).to.equal(baseURI+"0");
    });

    it("#2 Locked status should be True", async function() {
        await sbt.safeMint(owner.address);

        const lockStatus = await sbt.locked(0)
        expect(lockStatus == true);
    });

    it("#3 transferFrom should revert", async function() {
        await sbt.safeMint(owner.address);

        await expect(
            sbt.transferFrom(owner.address, account1.address, 0)
            ).to.be.reverted
    });

    it("#4 safeTransferFrom(address,address,uint256) should revert", async function() {
        await sbt.safeMint(owner.address);

        await expect(
            sbt["safeTransferFrom(address,address,uint256)"](owner.address, account1.address, 0)
            ).to.be.reverted
    });
    
    it("#5 safeTransferFrom(address,address,uint256,bytes) should revert", async function() {
        await sbt.safeMint(owner.address);

        await expect(
            sbt["safeTransferFrom(address,address,uint256,bytes)"](owner.address, account1.address, 0, [])
            ).to.be.reverted
    });

    // To aid recognition that an EIP-721 token implements "soulbinding" via this EIP upon calling EIP-721's 
    // function supportsInterface(bytes4 interfaceID) must return true.
    it("#6 Check Recognation of Soulbinding", async function() {
        const interfaceId = "0xb45a3c0e";
        const checkStatus = await sbt.supportsInterface(interfaceId)
        expect(checkStatus == true)
    });

    it("#7 Check updateBaseURI", async function() {   
        await sbt.safeMint(owner.address);
        const newBaseURI = "ipfs.io/ipfs/QmWXJXRdExse2YHRY21Wvh4pjRxNRQcWVhcKw4DLVnqGqs"
        await sbt.updateBaseURI(newBaseURI)

        expect(await sbt.tokenURI(0)).to.equal(newBaseURI+"0");
    });

});
