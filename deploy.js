const HDWallerProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const providerURL = "https://rinkeby.infura.io/..."; // replace with your Rinkeby	test network URL
const mnemonic = "in crypto we trust ..."; // replace with your 12 word wallet mnemonic.

const provider = new HDWallerProvider(mnemonic, providerURL);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploying from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['satoshi nakamoto']})
    .send({ gas: '1000000', from: accounts[0] });

  console.log('contact deployed to', result.options.address);
}

deploy();
