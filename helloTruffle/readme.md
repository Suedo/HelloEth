### What each folder contains:

- The `contracts` folder contains `.sol` files.
- The `migrations` folder help deploying the code to the blockchain.
- The `test` folder has all the mocha/chai tests for our smart contracts.
- The `build` folder has the compiled contract's json data, used for deploying

### Important files

`truffle-config.js`: config for how code gets compiled, and deployed to which blockchain.

### Steps to run:

```cmd
truffle develop     # opens the truffle console, & then inside the truffle console
migrate             # compiles the contracts, and deployes them to the blockchain
```