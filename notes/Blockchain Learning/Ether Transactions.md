# Ether Transactions

### Getting test ether from faucet

Using Metamask & Goerli test network, I requested some test ether from the Goerli faucet. I provided my Metamask address to the goerli faucet, and it sent over .05 eth.

The Goerli Test network link to my specific transaction:

[](https://goerli.etherscan.io/tx/0x7bb4b8eca07fc69a45506eb66666422da4574e3562db929219e4ded7c2e069fc)

```jsx
Transaction Hash: 0x7bb4b8eca07fc69a45506eb66666422da4574e3562db929219e4ded7c2e069fc
Status: Success
Block: 3675339 12 Block Confirmations
Timestamp: 2 mins ago (Nov-01-2020 03:45:44 AM +UTC)
From: 0x8ced5ad0d8da4ec211c17355ed3dbfec4cf0e5b9
To: 0xc3af7c9af645ee35faae87be2976a1fbea65d22f // my metamask address
Value: 0.05 Ether ($0.00)
Transaction Fee: 0.000021004 Ether ($0.000000)
Gas Price: 0.000000001 Ether (1 Gwei)
Gas Limit: 30,000
Gas Used by Transaction: 21,004 (70.01%)
Nonce Position: 155599 1
```

### **How does the blockchain know if a transaction is valid ?**

We need to [sign the transaction](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-accounts.html#signtransaction) using some library, and the blockchain will check the signature for verification. More details below:

The Ethereum account is the Keccak Hash of the the last 20 bytes of the Public Key, which itself is generated from the Private key via [ECDSA](https://hackernoon.com/a-closer-look-at-ethereum-signatures-5784c14abecc). Thus, both the Eth account, and the public key, are functions of the private key. 

![Ether%20Transactions%20e18501e6ab7b4c848d4e4650d20823d7/Untitled.png](Ether%20Transactions%20e18501e6ab7b4c848d4e4650d20823d7/Untitled.png)

Every outgoing txn is signed with the private key, to generate a Signed Transaction (STXN). This STXN contains the V, R and S cryptographic fields. These fields are complex stuff, and give the security and authenticity to the transaction (my understanding). Also, the R and S fields can be used to generate the Ethereum Account address via ECRECOVER. 

This the blockchain can cross verify the ethereum account from which the txn is happening, from both the signed transaction, as well as the private key. 

[A Closer Look At Ethereum Signatures | Hacker Noon](https://hackernoon.com/a-closer-look-at-ethereum-signatures-5784c14abecc)

**Note**: Account needs to be [unlocked]() in order to sign a transaction. [In order to unlock an account](https://ethereum.stackexchange.com/a/4159), you'll need to provide the password, which is used to decrypt the private key associated with your account, hence allowing you to sign transactions. Sending your account password over an unsecured HTTP RPC connection is highly unsecure.