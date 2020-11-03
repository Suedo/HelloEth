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
        require(
            msg.sender == owner,
            "Only owner can call this function."
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