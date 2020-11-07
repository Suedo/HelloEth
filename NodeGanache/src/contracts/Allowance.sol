pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";

contract Allowance is Ownable {
  using SafeMath for uint256;
  event AllowanceChanged(address indexed _forWho, address indexed _byWhom, uint256 _oldAmount, uint256 _newAmount);
  mapping(address => uint256) public allowance;

  // modifier is like a Decorator
  modifier ownerOrAllowed(uint256 _amount) {
    require(isOwner() || allowance[msg.sender] >= _amount, "You are not allowed!");
    _;
  }

  function isOwner() internal view returns (bool) {
    return owner() == msg.sender;
  }

  function reduceAllowance(address _who, uint256 _amount) internal ownerOrAllowed(_amount) {
    emit AllowanceChanged(_who, msg.sender, allowance[_who], allowance[_who].sub(_amount));
    allowance[_who] = allowance[_who].sub(_amount);
  }

  function setAllowance(address _who, uint256 _amount) public onlyOwner {
    emit AllowanceChanged(_who, msg.sender, allowance[_who], _amount);
    allowance[_who] = _amount;
  }

  function renounceOwnership() public override onlyOwner {
    revert("can't renounceOwnership here"); //not possible with this smart contract
  }
}
