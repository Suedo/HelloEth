// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract Lottery {
  address payable owner;
  address payable[] players;
  uint256 totalAmount;
  event Received(address from, uint256 amount, uint256 total); // print details for received amount
  event Sent(address from, address to, uint256 amount); // print details regarding amount transferred
  event Winner(address winnerAddress);

  constructor() {
    owner = msg.sender;
  }

  modifier isOwner() {
    require(msg.sender == owner, "Must be owner to throw dice");
    _;
  }

  receive() external payable {
    totalAmount += msg.value;
    uint256 idx = findPlayerIndex(msg.sender);
    if (idx == 999) {
      // new player
      players.push(msg.sender);
    }
    emit Received(msg.sender, msg.value, totalAmount);
  }

  function findPlayerIndex(address addr) internal view returns (uint256) {
    for (uint256 i = 0; i < players.length; i++) {
      if (players[i] == addr) return i;
    }
    return 999;
  }

  function throwDice() external isOwner {
    uint256 winner = block.timestamp % players.length;
    emit Winner(players[winner]);
    players[winner].transfer(totalAmount);
    totalAmount = 0;
    emit Sent(address(this), players[winner], totalAmount);
  }

  function getPlayers() public view returns (address payable[] memory) {
    return players;
  }
}
