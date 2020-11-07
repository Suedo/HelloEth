pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import {Allowance} from "Allowance.sol";

contract SharedWallet is Allowance {
  event MoneySent(address indexed _beneficiary, uint256 _amount);
  event MoneyReceived(address indexed _from, uint256 _amount);

  function withdrawMoney(address payable _to, uint256 _amount) public ownerOrAllowed(_amount) {
    require(_amount <= address(this).balance, "Contract doesn't own enough money");
    if (!isOwner()) {
      reduceAllowance(msg.sender, _amount);
    }
    emit MoneySent(_to, _amount);
    _to.transfer(_amount);
  }

  receive() external payable {
    emit MoneyReceived(msg.sender, msg.value);
  }
}
