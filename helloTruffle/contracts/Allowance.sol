// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Allowance is ReentrancyGuard {
  event Received(address from, uint256 amount, uint256 total); // print details for received amount
  event Sent(address from, address to, uint256 amount); // print details regarding amount transferred
  uint256 public totalAmount;

  // deposit funds
  receive() external payable {
    totalAmount += msg.value;
    emit Received(msg.sender, msg.value, totalAmount);
  }

  function withdraw(address payable to, uint256 amount) external payable nonReentrant {
    require(totalAmount > amount, "Not enough Funds");
    totalAmount -= amount;
    to.transfer(amount);
    emit Sent(address(this), to, amount);
  }
}
