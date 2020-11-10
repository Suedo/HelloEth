# Ethereum Blockchain Basics

My learnings from

1. [Ethereum and Solidity: The Complete Developer's guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/)
2. [Pluralsight Ethereum Course](https://app.pluralsight.com/library/courses/ethereum-blockchain-developing-applications/table-of-contents)
3. [Ethereum Engineering Group](https://www.youtube.com/channel/UC2iGGbbKzS2hYwcZ9xBS-6A) videos

Table Of Contents

## Ways to connect with the Eth network:

From a development pov, we use libraries like web3.js to make our code talk to the Eth Network. Whereas from a consumer pov, software like Metamask or Mist Browser can be used by the person to have an account in the ethereum network to receive and send tokens.

Each External Account ( i.e once created in Metamask etc) contains 3 pieces of info: an `Account Address` , a `Public Key` and a `Private Key`

## Contract Vs External Account:

A contract account has balance, storage and code. Balance indicates amount of ether it owns, storage is the data storage for the contract, and code it it's code (duh), in raw machine format. Each contract is specific to the network it resides in, and cannot be used in another network.

An External account is a consumer account, with an address, a private and public key. It is created via things like metamask, mist browser etc. It exists as an independent entity, and can the same external account can be used with any network (Ropsten, Kovan etc)

![Ethereum%20Blockchain%20Basics/Untitled.png](Ethereum%20Blockchain%20Basics/Untitled.png)

Multiple Instances can be deployed from the same smart contract source code into a network, much like multiple instances can be created from a class in an OOP language.

## Anatomy of a Transaction in the Ethereum Network

![Ethereum%20Blockchain%20Basics/Untitled%201.png](Ethereum%20Blockchain%20Basics/Untitled%201.png)

## Solidity, ABI and Solidity ByteCode

We will write our contracts in solidity, and the compiler will generate the ABI and bytecode from it. The ABI is like an API for interacting with the bytecode. This lets us communicate with the smart contract using our language of choice, like java, js, go etc.

![Ethereum%20Blockchain%20Basics/Untitled%202.png](Ethereum%20Blockchain%20Basics/Untitled%202.png)

![Ethereum%20Blockchain%20Basics/Untitled%203.png](Ethereum%20Blockchain%20Basics/Untitled%203.png)

source of below three blocks: [EEG video](https://www.youtube.com/watch?v=VH0obZ2A0Yg&t=2402s)

## Ethereum Core: Concepts

### Block processing layers

```bash
1. Block Processor
2. 	Block Validator
3. 		Tx Processor
4. 			Bytecode Executor
5. 				EVM
```

### Ethereum Storage basics

Global state data is **primarily stored as Patricia Merkle Tries (PMT) of RLP encoded data**, although in some cases (?) simpler key-value dbs like LevelDB are also used. So what is PMT, RLP ? below:

**RLP** is the main encoding method used to serialize objects in Ethereum. The only purpose of RLP is to encode structure. Encoding specific data types (eg. strings, floats) is left up to higher-order protocols. More details in [wiki](https://eth.wiki/en/fundamentals/rlp) page.

**Patricia Merkle Tries (**[eth wiki](https://eth.wiki/en/fundamentals/patricia-tree)**)**

1. Provide a cryptographically authenticated data structure that can be used to store all (key, value) bindings,
2. Are fully deterministic, i.e. that Patricia tries with the same (key,value) bindings are guaranteed to be exactly the same down to the last byte and therefore have the same root hash
3. Provide the holy grail of O(log(n)) efficiency for inserts, lookups and deletes
4. Are much easier to understand and code than more complex comparison-based alternatives like red-black tries

### Types of Ethereum Clients

Light Node, Full Node, Full Archive Node, Mine Pool Lead

**Light Node:** possibly: full json rpc, no consensus with other clients, no storage (maybe cache), defer blocks to networking layer

**Full Node: `Light Node` +** Verifies incoming blocks, has storage and maintains current world state, probably no consensus

**Full Archive Node: `Full Node` +** Maintains current world state as well as full world state history, thus has much more storage than a full node.

**Mining Pool Lead: `Full Archive Node` +** Maintains consensus. It takes transaction from the pool, pushes it through the block processor, generates a candidate block, pushes it through the consensus mechanism and once verified, broadcasts the block through the eth network.

### Main Operations with Ethereum clients/nodes

1. Query state of a node on the network
2. Get state of an Ethereum network (as the node sees it)
3. Send transaction, deploy contracts
4. Manage account via managing private keys

## Web3 and Ethereum

### Steps to create a web3 instance

```jsx
let Web3 = require("web3"); // 1. Import web3 module
let web3i = new Web3(); // 2. Create an instance of the module
web3i.setProvider(
  // 3. set the provider
  new web3i.providers.HttpProvider(
    "http://localhost:8545" // url of eth client
  )
);
```

### How a contract is deployed through web3 api

We create a web3 contract from the abi, and then use web3's deploy and send methods to deploy it to the Ethereum network

```jsx
let MyContract = new web3.net.contract(myContractAbi);
let contractDataObject = {
  data: bytecode,
};
let instance = await MyContract.deploy(contractDataObject).send({
  from: "0x...", // account from which ether/gas will be used to create the contract
  gas: 150000, // maximum amount of gas
});
```

### Steps to access a contract instance

1. Get the abi of the contract. Mostly this will be in json format.
2. Get the contract address ( generally a hex number)
3. Create a new contract instance using the abi and contract address with the previously created web3 instance

```jsx
let abi = readJsonFile("contractAbi.json");
let contractAddress = "0x...";
let contract = new web3.eth.Contract(abi, contractAddress);
```

### How the contract instance works/flows:

1. We call a method on the contract, returns a promise immediately
2. The contract sends an http request containing our method call to the Ethereum client
3. The Ethereum client will create a transaction, sign it with our private key, and send it to the Ethereum network for execution.
4. When the client gets a reply from the network, it will reply to the contract, and our promise will resolve

![Ethereum%20Blockchain%20Basics/Untitled%204.png](Ethereum%20Blockchain%20Basics/Untitled%204.png)

## Articles from the web

### Why can't contracts make API calls?

TLDR: because api calls are non-deterministic, and Ethereum blockchain is designed to be deterministic, such that replaying the whole history of events in the blockchain will always give the same result. API calls will break that.

[Why can't contracts make API calls?](https://ethereum.stackexchange.com/a/334/22522)
