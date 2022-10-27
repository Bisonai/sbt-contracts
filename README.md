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

## Predefined networks

`hardhat.config.ts` defines supported networks where SBT can be deployed.
Currently, you can deploy to your `localhost`, `baobab` or `cypress`.
If you want to deploy to other network, simply add connection information to `hardhat.config.ts`.

## Run test

Before running test, make sure you compile your smart contracts.

```shell
npx hardhat test
```

## Deploy SBT

To deploy your SBT call `npx hardhat deploy` command and set options `--base-uri`, `--name`, `--symbol`.
If you want to deploy to specific network you can defined it using `--network` option.

```
Hardhat version 2.10.1

Usage: hardhat [GLOBAL OPTIONS] deploy --base-uri <STRING> --name <STRING> --symbol <STRING>

OPTIONS:

  --base-uri    URI (must end with /) that will be used as prefix when returning tokenURI
  --name        SBT name
  --symbol      SBT symbol

deploy: Deploy SBT

For global options help run: hardhat help
```

### Example of deploying SBT in localhost network

```shell
npx hardhat deploy \
    --name MySBT \
    --symbol MSBT \
    --base-uri "http://localhost/" \
    --network localhost
```

Output

```
SBT was deployed to localhost network and can be interacted with at address 0xd65C849d9ADf21bc83cD8dEC377C4f0181dEcE6B
```

## Mint SBT

When minting SBT, specify address of deployed SBT as `--address`, address that will receive SBT token as `--to` and ID of token as `--token-id`.
Do not forget that single account can hold only single SBT token and that ID of every token is unique and cannot be reused.
After SBT is minted to specified account, it cannot be transferred to any other token.

```
Hardhat version 2.10.1

Usage: hardhat [GLOBAL OPTIONS] mint --address <STRING> --to <STRING> --token-id <STRING>

OPTIONS:

  --address     Address of deployed SBT
  --to          Address receiving SBT token
  --token-id    ID of SBT token that is being minted

mint: Mint SBT

For global options help run: hardhat help
```

### Example of minting SBT in localhost network

```
npx hardhat mint \
    --address 0xd65C849d9ADf21bc83cD8dEC377C4f0181dEcE6B \
    --to 0xeaeF3D4964F40924D3082CFcB6F7E1d9Fe5D299B \
    --token-id 123  \
    --network localhost
```

Output

```
SBT with tokenId 123 was minted for address 0xeaeF3D4964F40924D3082CFcB6F7E1d9Fe5D299B
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
