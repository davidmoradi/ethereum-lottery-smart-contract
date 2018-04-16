const path = require('path');
const fs   = require('fs');
const solc = require('solc');

const numberOfContracts = 1
const contractPath      = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const contractSource    = fs.readFileSync(contractPath, 'utf8');

// Revisit if you have more than one contract.
// This by default exports the boilerplate Inbox contract.
module.exports = solc.compile(contractSource, numberOfContracts).contracts[':Lottery'];
