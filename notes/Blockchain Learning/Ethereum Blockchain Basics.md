# Ethereum Blockchain Basics

My learnings from [Ethereum and Solidity: The Complete Developer's guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/)

### Ways to connect with the Eth network:

From a development pov, we use libraries like web3.js to make our code talk to the Eth Network. Whereas from a consumer pov, software like Metamask or Mist Browser can be used by the person to have an account in the ethereum network to receive and send tokens. 

Each External Account ( i.e once created in Metamask etc) contains 3 pieces of info: an `Account Address` , a `Public Key` and a `Private Key`

### Contract Vs External Account:

A contract account has balance, storage and code. Balance indicates amount of ether it owns, storage is the data storage for the contract, and code it it's code (duh), in raw machine format. Each contract is specific to the network it resides in, and cannot be used in another network.

An External account is a consumer account, with an address, a private and public key. It is created via things like metamask, mist browser etc. It exists as an independent entity, and can the same external account can be used with any network (Ropsten, Kovan etc)

![Ethereum%20Blockchain%20Basics/Untitled.png](Ethereum%20Blockchain%20Basics/Untitled.png)

Multiple Instances can be deployed from the same smart contract source code into a network, much like multiple instances can be created from a class in an OOP language. 

### Anatomy of a Transaction in the Ethereum Network

![Ethereum%20Blockchain%20Basics/Untitled%201.png](Ethereum%20Blockchain%20Basics/Untitled%201.png)

### Solidity, ABI and Solidity ByteCode

We will write our contracts in solidity, and the compiler will generate the ABI and bytecode from it. The ABI is like an API for interacting with the bytecode. This lets us communicate with the smart contract using our language of choice, like java, js, go etc. 

![Ethereum%20Blockchain%20Basics/Untitled%202.png](Ethereum%20Blockchain%20Basics/Untitled%202.png)

![Ethereum%20Blockchain%20Basics/Untitled%203.png](Ethereum%20Blockchain%20Basics/Untitled%203.png)