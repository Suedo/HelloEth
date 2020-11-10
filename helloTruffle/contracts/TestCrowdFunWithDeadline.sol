// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.4;
// pragma experimental ABIEncoderV2;
import "./CrowdFundWithDeadline.sol";

contract TestCrowdFunWithDeadline is CrowdFundingWithDeadline {

  // for testing, we will rely on manually set time
  uint time;

  constructor (
    string memory _contractName,
    uint256 _targetAmountEth,
    uint256 _durationInMin,
    address payable _beneficiary
  ) CrowdFundingWithDeadline(_contractName, _targetAmountEth, _durationInMin, _beneficiary) {}

  function currentTime() internal view returns(uint) {
    return time;
  }

  function setCurrentTime(uint _time) public {
    time = _time;
  }

}
