const ganache = require('ganache-cli');
const assert = require('assert');
const Web3  = require('web3');
const web3  = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

const _pickWinner = async () => {
  console.log('called');
  await lottery.methods.pickWinner().send({ from: accounts[0]});
}

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000'});
});

describe('Lottery conract', () => {
  it('deploys the contract', () => {
    assert.ok(lottery.options.address);
  });
});

describe('Entering the lottery', () => {
  it('allows one player to enter the lottery', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(players[0], accounts[0]);
    assert.equal(1, players.length);
  });

  it('allows multiple players to enter the lottery', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(players[0], accounts[0]);
    assert.equal(players[1], accounts[1]);
    assert.equal(players[2], accounts[2]);
    assert.equal(3, players.length);
  });


  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it('only manger can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });
});

describe('Somewhat End to End', () => {
  beforeEach(async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });
  })

  it('sends money to the winner', async () => {
    const initalBallance = await web3.eth.getBalance(accounts[0])
    await _pickWinner();
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initalBallance

    assert(difference > web3.utils.toWei('1.99', 'ether'));
  });

  it('resets players', async () => {
    await _pickWinner();

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(0, players.length);
  });

  it('contact has no balance left after sending money to the winner', async () => {
    await _pickWinner();
    const contractBalance = await web3.eth.getBalance(lottery.options.address);

    assert.equal(0, contractBalance);
  })
});
