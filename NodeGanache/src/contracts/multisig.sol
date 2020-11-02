// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract MultiSig {
  uint256 minApprovers;
  address payable beneficiary;
  address payable owner;

  mapping(address => bool) approvedBy;
  mapping(address => bool) isApprover;
  uint256 approvalsNum;

  constructor(
    address[] memory _approvers,
    uint256 _minApprovers,
    address payable _beneficiary
  ) public payable {
    require(_approvers.length >= _minApprovers, "More Approvers needed!");

    minApprovers = _minApprovers;
    beneficiary = _beneficiary;
    owner = msg.sender;

    // initialize the approvers list
    for (uint256 i = 0; i < _approvers.length; i++) {
      isApprover[_approvers[i]] = true;
    }
  }

  /*
    for both approve as well as reject functions, once either approved (by all) 
    or rejected by any one, the contract will transfer all accrued funds to the owner
    and self destruct
  */
  function approve() public {
    // must be an approver, and not already approved
    require(isApprover[msg.sender], "Not an approver");
    require(!approvedBy[msg.sender], "Already approved");

    approvalsNum++;
    approvedBy[msg.sender] = true;

    if (approvalsNum == minApprovers) {
      beneficiary.transfer(address(this).balance);
      selfdestruct(owner);
    }
  }

  function reject() public {
    require(isApprover[msg.sender], "Calling Address not an approver");
    selfdestruct(owner);
  }
}
