// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
  string public data;

  function setData(string calldata _data) external {
    data = _data;
  }
}
