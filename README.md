# @bisonai/sbt-contracts

This repository defines smart contracts, deployment and test scripts for Soulbound token (SBT).

## Prerequisites

1. Generate mnemonic if you do not have any.

```shell
npx mnemonics
```

2. Create `.env` from `.env.example`.

```shell
cp .env.example .env
```

3. Fill in generated mnemonic to `MNEMONIC` environment variable.

## Compilation

```
npx hardhat compile
```

## Deployment

`hardhat.config.ts` defines supported networks where SBT can be deployed.
Currently, you can deploy to your `localhost`, `baobab` or `cypress`.
To deploy call command below and replace `$NETWORK` with any of the supported networks.

```shell
npx hardhat run --network $NETWORK ./scripts/deploy.ts
```

## Run test

Before running test, make sure you compile your smart contracts.

```shell
npx hardhat test
```

## Publishing

```shell
npx hardhat clean
npx hardhat compile
yarn build
yarn pub
```

## Before open sourcing

- [ ] setup public registry
- [ ] deploy to public registry
- [ ] remove information about private registry (.npmrc, package.json)
- [ ] update baseURI for testing
