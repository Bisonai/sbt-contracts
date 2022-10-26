import { ethers } from 'hardhat'

async function main() {
  const sbt = await ethers.getContractAt('SBT', '0x915b599DF941737Df3f69C7C4fB84BCE95CF21d6')

  const [owner] = await ethers.getSigners()
  for (let i = 0; i < 1; ++i) {
    console.log('Minting ', i)
    const tx = await sbt.safeMint(owner.address, 0)
    await tx.wait()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
