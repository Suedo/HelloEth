# Truffle

Web3 is too low level. For modern Ethereum development, truffle is the most widely used framework. 

### The most common truffle commands:

```bash
truffle init                # create a new project
truffle unbox <box-name>    # download and unpack demo project
  ex: truffle unbox metacoin
truffle compile             # compiles the contracts
truffle develop             # start test ethereum network
truffle test                # run unit test
truffle migrate             # deploy smart contracts
truffle migrate --reset     # test network reset (dont do in prod)
```