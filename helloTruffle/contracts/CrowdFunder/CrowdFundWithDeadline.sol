// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract CrowdFundingWithDeadline {
  enum Status {Ongoing, Failed, Succeeded, PaidOut} // internally recorded as 0,1,2,3 

  string public name;
  uint256 public targetAmount;
  uint256 public fundingDeadline;
  address payable public beneficiary;
  Status public status;

  constructor(string memory _contractName, uint _targetAmountEth, uint _durationInMin, address payable _beneficiary) {
    name = _contractName;
    targetAmount = _targetAmountEth * 1 ether; // convert ether to wei, and save as wei
    fundingDeadline = block.timestamp + (_durationInMin * 1 minutes);
    beneficiary = _beneficiary;
    status = Status.Ongoing;
  }
}
