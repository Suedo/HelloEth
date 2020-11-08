// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract Voter {
  struct OptionPos {
    uint256 pos;
    bool exists;
  }

  uint256[] private votes;
  string[] private options;
  mapping(address => bool) hasVoted;
  mapping(string => OptionPos) optionMap;

  constructor(string[] memory _options) {
    options = _options;
    votes = new uint256[](options.length);

    for (uint256 i = 0; i < _options.length; i++) {
      OptionPos memory iOpt = OptionPos(i, true);
      string memory optName = _options[i];
      optionMap[optName] = iOpt;
    }
  }

  // vote method 1: vote by index number
  // constructor got ["biden","trump"], so, to vote for biden, you need to pass `0` as option
  function vote(uint256 option) public {
    require(0 <= option && option < options.length, "Entered option Out of Bounds!");
    require(!hasVoted[msg.sender], "Already Voted!");

    votes[option] = votes[option] + 1;
    hasVoted[msg.sender] = true;
  }

  // vote method 2: vote by candidate name
  // constructor got ["biden","trump"], so, to vote for biden, just pass "biden"
  function vote(string memory optionName) public {
    require(!hasVoted[msg.sender], "Already Voted!");

    OptionPos memory opt = optionMap[optionName];
    votes[opt.pos] = votes[opt.pos] + 1;
    hasVoted[msg.sender] = true;
  }

  // https://ethereum.stackexchange.com/a/58715
  // string itself is a dynamic array, thus string[] is a double dynamic array
  // solidity doesnt support such double dynamic array natively, hence, need AbiEncoderv2
  function getOptions() public view returns (string[] memory) {
    return options;
  }

  function getVotes() public view returns (uint256[] memory) {
    return votes;
  }
}
