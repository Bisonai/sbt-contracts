# SBT contracts

Create NFT (https://wizard.openzeppelin.com/) and deploy to Baobab.

## Prerequisites

Generate mnemonic.

```shell
npx mnemonics
```

Create `.env` and fill in generated mnemonic to `MNEMONIC` environment variable.


```shell
cp .env.example .env
```


## Test

```shell
npx hardhat test
```

## Deploy locally

```shell
npx hardhat run --network localhost ./scripts/deploy.ts
```

## Deploy to Baobab

```shell
npx hardhat run --network baobab ./scripts/deploy.ts
```
