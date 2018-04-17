pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address public winner;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function kindaRandom() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint index = kindaRandom() % players.length;

        // the entitre balance of this contract to the winner.
        players[index].transfer(this.balance);
        // set winner
        winner = players[index];
        // clear players and start over.
        players = new address[](0);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    // restrict to only the manager (the contract creator)
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
