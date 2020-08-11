const Web3 = require("web3");
const rpcURL = ""; // Paste the Ganache RPC Url here, e.g. http://localhost:7545
const web3 = new Web3(rpcURL);

const address = ""; // Paste the smart contract address here after you have deployed it
const contract = new web3.eth.Contract(abi, address);

const owner = ""; // Paste the 1st account from Ganache here
const account1 = ""; // Paste the 2nd account from Ganache here
const account2 = ""; // Paste the 3rd account from Ganache here

async function run() {
  let result, amount;

  result = await contract.methods.name().call();
  console.log(`Token name: ${result}`);

  result = await contract.methods.totalSupply().call();
  console.log(`Total Supply: ${web3.utils.fromWei(result, "ether")} tokens`);

  amount = web3.utils.toWei("100");
  await contract.methods.mint(account1, amount).send({ from: owner });
  console.log(
    `Minted ${web3.utils.fromWei(amount, "ether")} tokens for account #1`
  );

  result = await contract.methods.balanceOf(account1).call();
  console.log(`Balance of account #1: ${web3.utils.fromWei(result, "ether")}`);

  amount = web3.utils.toWei("50");
  result = await contract.methods
    .transfer(account2, amount)
    .send({ from: account1 });
  console.log(
    `Transferred ${web3.utils.fromWei(
      amount,
      "ether"
    )} tokens from account #1 to account #2`
  );

  result = await contract.methods.balanceOf(account1).call();
  console.log(`Balance of account #1: ${web3.utils.fromWei(result, "ether")}`);

  result = await contract.methods.balanceOf(account2).call();
  console.log(`Balance of account #2: ${web3.utils.fromWei(result, "ether")}`);

  result = await contract.methods.totalSupply().call();
  console.log(`Total Supply: ${web3.utils.fromWei(result, "ether")} tokens`);
}

run();
