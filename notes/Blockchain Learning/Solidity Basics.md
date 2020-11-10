# Solidity Basics

Starting off with what I am learning from this Udemy course. Most tutorials are based on older compiler versions. Planning to add advanced stuff once basics are done

[Code with Ethereum & Solidity: The Complete Developer Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/)

### Constructor

this block gets executed when we are deploying the code to the blockchain. Only one constructor is allowed, thus no overloading.

```jsx
constructor() public {
	// logic here
}
```

### Creating contracts via `new`

- Solidity docs [here](https://solidity.readthedocs.io/en/v0.7.4/control-structures.html#creating-contracts-via-new)

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

contract D {
    uint public x;
    constructor(uint a) payable {
        x = a;
    }
}

contract C {
    D d = new D(4); // will be executed as part of C's constructor

    function createD(uint arg) public {
        D newD = new D(arg);
        newD.x();
    }

    function createAndEndowD(uint arg, uint amount) public payable {
        // Send ether along with the creation
        D newD = new D{value: amount}(arg);
        newD.x();
    }
}
```

### Default values of variables

All values are initialized by default. There is no null or undefined etc. Defaults:

```jsx
uint = 0;
int = 0;
bool = false;
string = ""; // empty string
```

`public` variables generate a `getter` with the same name of the variable. You can't create a function with the same name as the variable yourself.

### Integer Wrap Around

```jsx
uint8 myUint8 = 0;
myUnint8--; // this becomes 255!!
```

`uint` are not signed, so, decrementing 0 results in wrap around to 255 instead of -1

### Keywords/concepts to check:

view, payable, public, enum, mapping, returns (in method signature), transfer, msg.sender, msg.value, ownership, transfer ownership, require, assert, "modifier" being used to generate checks which can be added to method signature, events, receive function, why receive functions needs to be marked external, Inheritance, Factories, Smart Contract Interactions, 

### Pure functions vs View Functions

Functions declared as a `[view](https://solidity.readthedocs.io/en/v0.7.4/contracts.html?#view-functions)` promise not to modify the state of the contract. Whereas Functions declared as `[pure](https://solidity.readthedocs.io/en/v0.7.4/contracts.html?#pure-functions)` promise not to modify the state, nor read the state of a contract. 

Note: If the compiler’s EVM target is Byzantium or newer (default) the opcode `STATICCALL` is used, which does not guarantee that the state is not read, but at least that it is not modified.

### Internal vs Private Methods

Internal methods can be called from child contracts, but private methods cannot. Private methods can only be called from inside the same contract.

### Fallback & Receive Functions

The `fallback` function always receives **data**, but in order to also receive **Ether** it must be marked **payable**. A contract can have **at most one** fallback function, declared using `fallback () external [payable]` (without the function keyword). Similarly, the `receive` function is declared using `receive() external payable { ... }`

Neither the `fallback` nor `receive` function can have arguments, they cannot return anything and must have external visibility. The `receive` function additionally must have `payable` state mutability. 

- The `fallback` function is executed on
    1. a call to the contract if none of the other functions match the given function signature, or 
    2. if no data was supplied at all and there is ***no*** `receive` Ether function.
- The `receive` function is executed on:
    1. a call to the contract with empty calldata.  
    2. on plain Ether transfers (e.g. via `.send()` or `.transfer()`). If no such function exists, but a `payable` `fallback` function exists, the fallback function will be called on a plain Ether transfer.

More details: [Fallback function](https://solidity.readthedocs.io/en/v0.7.4/contracts.html?#fallback-function), [Receive function](https://solidity.readthedocs.io/en/v0.7.4/contracts.html?#receive-ether-function)

### Constant & Immutable

State variables can be declared as constant or immutable. In both cases, the variables cannot be modified after the contract has been constructed. For constant variables, the value has to be fixed at compile-time, while for immutable, it can still be assigned at construction time. The compiler does not reserve a storage slot for these variables, and every occurrence in code is replaced by the respective value, either at compile time or runtime, making the gas costs of constant and immutable variables much lower. 

Click to learn more: [Constant](https://solidity.readthedocs.io/en/v0.7.4/contracts.html?#constant) , [Immutable](https://solidity.readthedocs.io/en/v0.7.4/contracts.html?#immutable)

```jsx
pragma solidity >0.7.2;

uint constant X = 32**22 + 8;

contract C {
    string constant TEXT = "abc";
    bytes32 constant MY_HASH = keccak256("abc"); // compile time
    uint immutable decimals;
    uint immutable maxBalance;
    address immutable owner = msg.sender;
		// ^^ value determined @runtime, thus couldn't be a constant
.
.
}
```

### Function Modifiers

Modifiers can be used to change the behavior of functions in a declarative way. Modifiers are inheritable properties of contracts and may be overridden by derived contracts, but only if they are marked `virtual`. More details [here](https://solidity.readthedocs.io/en/v0.7.4/contracts.html?#function-modifiers).

```jsx
pragma solidity >0.7.0 <0.8.0;

contract owned {
    constructor() { owner = msg.sender; }
    address payable owner;

    // This contract only defines a modifier but does not use it: 
    // it will be used in derived contracts. The function body is inserted where 
    // the special symbol `_;` in the definition of a modifier appears. This means that 
    // if the owner calls this function, the function is executed and otherwise, an exception is thrown.
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function."
        );
        _;
    }
}

contract destructible is owned {
    // This contract inherits the `onlyOwner` modifier from `owned` and applies it to the
    // `destroy` function, which causes that calls to `destroy` 
    // only have an effect if they are made by the stored owner.
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}
```

### Return Values

Solidity programs can return multiple values. Also, the return signature on the method has names of variables. We can directly assign to these named variables, and skip the `return` keyword inside the function body, or, be more traditional like other languages, and have a `return` statement that matches the signature of the function, without paying much heed to the names of the variables in the method's return signature. Below are two methods of returning as described:

```jsx
pragma solidity >=0.4.16 <0.8.0;

// Method 1: assign to return variables
contract Simple {
    function arithmetic(uint _a, uint _b) public pure
        returns (uint o_sum, uint o_product) { 
        o_sum = _a + _b;
        o_product = _a * _b;
    }
}

// Method 2: use traditional return statement
contract Simple {
    function arithmetic(uint _a, uint _b) public pure
        returns (uint o_sum, uint o_product) {
        return (_a + _b, _a * _b);
    }
}
```

### Destructuring Assignments and Returning Multiple Values

- Solidity docs on this topic: [here](https://solidity.readthedocs.io/en/v0.7.4/control-structures.html#destructuring-assignments-and-returning-multiple-values)

```jsx
contract c {
  function f() public pure returns (uint, bool, uint) {
      return (7, true, 2);
  }

  function g() public {
      // Variables declared with type and assigned from the returned tuple,
      // not all elements have to be specified (but the number must match).
      (uint x, , uint y) = f();
      // Common trick to swap values -- does not work for non-value storage types.
      (x, y) = (y, x);
      // Components can be left out (also for variable declarations).
      (index, , ) = f(); // Sets the index to 7
  }
}
```

### Funds Transfer

```jsx
/* checking balance */
address addr = msg.sender; // an address, here, the one who invoked the call
uint accountBalance = addr.balance; // amount of wei in the account
address(this).balance; // another way to get balance of current account

/* funds transfer */
addr2 = ... // some address to transfer to
addr2.transfer(1000); // 1000 wei, method 1, recommended
bool success = addr2.send(1000); // 1000 wei, method 2, bad way
```

`address.transfer` method is safer, as it refunds the source if the transfer fails. `address.send` just returns false if fails. Always better to use `transfer` than send. More details, and better solutions than either of these, mentioned [here](https://solidity.readthedocs.io/en/latest/types.html?#members-of-addresses)

### Global Variables

Solidity [Cheatsheet on global variables](https://solidity.readthedocs.io/en/v0.7.4/cheatsheet.html?highlight=timestamp#global-variables), straight from the docs. Some common ones below:

```bash
this(current contract's type)           # the current contract, explicitly convertible to address or address payable
super                                   # the contract one level higher in the inheritance hierarchy

selfdestruct(address payable recipient) # destroy the current contract, sending its funds to the given address

<address>.balance (uint256)             # balance of the Address in Wei
<address payable>.send(uint256 amount) returns (bool) # send given amount of Wei to Address, returns false on failure
<address payable>.transfer(uint256 amount)            # send given amount of Wei to Address, throws on failure

block.coinbase   (address payable)  # current block miner’s address
block.difficulty (uint)             # current block difficulty
block.gaslimit   (uint)             # current block gaslimit
block.number     (uint)             # current block number
block.timestamp  (uint)             # current block timestamp ([can be manipulated by miners](https://solidity-by-example.org/0.5/hacks/block-timestamp-manipulation/))

gasleft()        returns (uint256)  # remaining gas

msg.data         (bytes)            # complete calldata
msg.sender       (address payable)  # sender of the message (current call)
msg.value        (uint)             # number of wei sent with the message

tx.gasprice      (uint)             # gas price of the transaction
tx.origin        (address payable)  # sender of the transaction (full call chain)

# abort execution and revert state changes if condition is false 
# (use for malformed input or error in external component). Also provide error message.
require(bool condition, string memory message) 
```

### Enums

```jsx
enum Status {
  NotStarted,
  InProgress,
  Finished
}

Status currentStatus = Status.NotStarted;
require(currentStatus != Status.Finished)
```

## Interesting articles from the web

### Storage patterns

Some simple and useful storage patterns in increasing order of utility. Event logs are omitted for brevity. In practice, it's desirable to emit events for every important state change.

[Are there well-solved and simple storage patterns for Solidity?](https://ethereum.stackexchange.com/a/13168)

### Calldata vs Memory

**TLDR**: `calldata` is allocated by the caller, while `memory` is allocated by the callee. `calldata` is also immutable, and used for external function params. Must be used for dynamic external params.

[When should I use calldata and when should I use memory?](https://ethereum.stackexchange.com/questions/74442/when-should-i-use-calldata-and-when-should-i-use-memory)

### External vs Public

- Solidity docs about [Function Calls](https://solidity.readthedocs.io/en/v0.7.4/control-structures.html#function-calls)
- Internal vs Private discussed a bit [above]() in this page

`**public` functions need to write all of the arguments to memory** : because public functions may be called internally, which is actually an entirely different process than external calls. Internal calls are executed via jumps in the code, and array arguments are passed internally by pointers to memory. Thus, when the compiler generates the code for an internal function, that function expects its arguments to be located in memory. For external functions, the compiler doesn't need to allow internal calls, and so it allows arguments to be read directly from calldata, saving the copying step.

**Best Practices:** you should use `external` if you expect that the function will only ever be called externally, and use `public` if you need to call the function internally. It almost never makes sense to use the `this.f()` pattern, as this requires a real `CALL` to be executed, which is expensive. Also, passing arrays via this method would be far more expensive than passing them internally

[`external` vs `public` best practices](https://ethereum.stackexchange.com/questions/19380/external-vs-public-best-practices)