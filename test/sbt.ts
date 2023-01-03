import { expect } from 'chai'
import { ethers } from 'hardhat'
import { PromiseOrValue } from '../typechain-types/common'
import { SBT } from '../typechain-types'

const tokenID0 = 0
const tokenID1 = 1
const baseURI = 'http://localhost/'

let sbt: SBT
let ownerAccount: { address: PromiseOrValue<string> }
let otherAccount: { address: PromiseOrValue<string> }

describe('SBT', async function () {
  beforeEach(async () => {
    const sbtContract = await ethers.getContractFactory('SBT')
    const sbtName = 'SBT'
    const sbtSymbol = 'SBT'
    sbt = await sbtContract.deploy(sbtName, sbtSymbol, baseURI)
    ;[ownerAccount, otherAccount] = await ethers.getSigners()
    await sbt.safeMint(ownerAccount.address, tokenID0)
  })

  it('#1 Should mint single SBT', async function () {
    expect(await sbt.balanceOf(ownerAccount.address)).to.equal(1)
    expect(await sbt.tokenURI(0)).to.equal(baseURI + '0')
  })

  it('#2 Should fail minting twice with same address', async function () {
    await expect(sbt.safeMint(ownerAccount.address, tokenID1)).to.be.revertedWith('MNT01')
  })

  it('#3 Should fail minting twice with same tokenID', async function () {
    await expect(sbt.safeMint(otherAccount.address, tokenID0)).to.be.revertedWith('MNT02')
  })

  it('#4 Should burn SBT', async function () {
    expect(await sbt.ownerOf(tokenID0)).to.equal(ownerAccount.address)
    expect(await sbt.balanceOf(ownerAccount.address)).to.equal(1)
    await sbt.burn(tokenID0)
    await expect(sbt.ownerOf(tokenID0)).to.be.revertedWith('ERC721: invalid token ID')
    expect(await sbt.balanceOf(ownerAccount.address)).to.equal(0)
  })

  it('#5 Should fail burning non owning SBT', async function () {
    await sbt.safeMint(otherAccount.address, tokenID1)
    expect(await sbt.ownerOf(tokenID1)).to.be.equal(otherAccount.address)
    await expect(sbt.burn(tokenID1)).to.be.revertedWith('BRN01')
  })

  it('#6 Locked status should be True', async function () {
    const lockStatus = await sbt.locked(tokenID0)
    expect(lockStatus == true)
  })

  it('#7 Locked status should be reverted not minted tokenID', async function () {
    await expect(sbt.locked(tokenID1)).to.be.reverted
  })

  it('#8 transferFrom should revert', async function () {
    await expect(sbt.transferFrom(ownerAccount.address, otherAccount.address, tokenID0)).to.be
      .reverted
  })

  it('#9 safeTransferFrom(address,address,uint256) should revert', async function () {
    await expect(
      sbt['safeTransferFrom(address,address,uint256)'](
        ownerAccount.address,
        otherAccount.address,
        tokenID0
      )
    ).to.be.reverted
  })

  it('#10 safeTransferFrom(address,address,uint256,bytes) should revert', async function () {
    await expect(
      sbt['safeTransferFrom(address,address,uint256,bytes)'](
        ownerAccount.address,
        otherAccount.address,
        tokenID0,
        []
      )
    ).to.be.reverted
  })

  // To aid recognition that an EIP-721 token implements "soulbinding" via this EIP upon calling EIP-721's
  // function supportsInterface(bytes4 interfaceID) must return true.
  // TODO To be sure interfaceID working right
  it('#11 Check recognition of Soulbinding', async function () {
    const interfaceId = '0xb45a3c0e'
    const checkStatus = await sbt.supportsInterface(interfaceId)
    expect(checkStatus == true)
  })
})
