// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract HelloBlock {
  string myString;
  mapping(address => uint256) balances;
  event Received(address, uint256, uint256); // print details for received amount
  event Sent(address, address, uint256, uint256); // print details regarding amount transferred

  function setMyString(string memory _myString) public {
    myString = _myString;
  }

  function getMyString() public view returns (string memory) {
    return myString;
  }

  function withdrawEther(
    address _from,
    address payable _to,
    uint256 _amount
  ) public {
    if (balances[_from] >= _amount) {
      _to.transfer(_amount);
      emit Sent(_from, _to, _amount, balances[_from]);
    }
  }

  // default fallback
  receive() external payable {
    balances[msg.sender] += msg.value;
    emit Received(msg.sender, msg.value, balances[msg.sender]);
  }
}
