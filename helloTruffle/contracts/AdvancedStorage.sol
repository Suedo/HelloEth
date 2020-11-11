// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract AdvancedStorage {
  uint256[] public ids;

  function addId(uint256 _id) public {
    ids.push(_id);
  }

  function getIthId(uint256 i) public view returns (uint256) {
    return ids[i];
  }

  function getAllIds() public view returns (uint256[] memory) {
    return ids;
  }

  function count() public view returns (uint256) {
    return ids.length;
  }
}
