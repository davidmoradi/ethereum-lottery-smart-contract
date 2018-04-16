# ethereum-lottery-smart-contract
Ethereum / Solidity Smart Contract BoilerPlate

## General Usage
You can use this smart contract boilerplate to write and deploy smart contracts to Ethereum networks.

### Steps:
Sign up for [https://metamask.io/](https://metamask.io/) to get an Ethereum wallet. Make sure to save your 12 word wallet mnemonic somewhere safe.

Visit [https://www.rinkeby.io/#faucet](https://www.rinkeby.io/#faucet) to get some test Ether coins on Rinkeby test network.

Sign up for a free account on [https://infura.io/](https://infura.io/) to get an Ethereum client provider. Full Documentation can be found at [https://infura.io/docs](https://infura.io/docs)

Replace `providerURL` and `mnemonic` constants in `deploy.js` file with yours.

```javascript
const providerURL = "https://rinkeby.infura.io/..."; // replace with your Rinkeby test network URL
const mnemonic = "in crypto we trust ..."; // replace with your 12 word wallet mnemonic.
```

Install packages
```Bash
npm install
```

Run tests:
```Bash
npm run tests
```

Deploy your smart contract to Ethereum Rinkeby network:
```Bash
npm run deploy
```

This contact is currently deployed to rinkeby test network:
https://rinkeby.etherscan.io/address/0x3aBBA04e8e2392139d76434C3dfeC802F8e41eeC

Visit [https://www.rinkeby.io/#explorer](https://www.rinkeby.io/#explorer) to find your deployed
smart contract.
