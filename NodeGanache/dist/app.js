import Web3 from "web3";
const rpcURL = "http://localhost:8545"; // Ganache RPC Url
const web3 = new Web3(rpcURL);
import { Allowance } from "./artifacts/abis/index.js";
const address = {
    allowance: "0xc8627Ae577cFFe5771024C09F3154821fD1A1Fd8",
    sharedWallet: "0x2de088ecB99c392726C7d33F7F636358C71A4C02",
};
const allowanceContract = new web3.eth.Contract(Allowance, address.allowance);
const owner = "0xC3af7c9af645Ee35FAaE87Be2976A1FbEA65D22f"; // 1st account from ganache
const account1 = "0x6b4f763cEc62569B0128139d9547C96c3ccd3322"; // 2nd account from ganache
const account2 = "0xaD99FfBD55d7b96c98A73773c02D84Bef3D914F6"; // 3rd account from ganache
async function run() {
    let result, amount;
    const oneEther = web3.utils.toWei("1");
    const milliEther = web3.utils.toWei(".001");
    result = await allowanceContract.methods.owner().call();
    console.log(`Token name: ${result}`);
    result = await allowanceContract.methods.setAllowance(account1, oneEther).send({ from: owner });
    console.log(result);
    result = await allowanceContract.methods.allowance(account1).call();
    console.log(result);
    // result = await allowanceContract.methods.totalSupply().call();
    // console.log(`Total Supply: ${web3.utils.fromWei(result, "ether")} tokens`);
    // await allowanceContract.methods.mint(account1, amount).send({ from: owner });
    // console.log(`Minted ${web3.utils.fromWei(amount, "ether")} tokens for account #1`);
    // result = await allowanceContract.methods.balanceOf(account1).call();
    // console.log(`Balance of account #1: ${web3.utils.fromWei(result, "ether")}`);
    // amount = web3.utils.toWei("50");
    // result = await allowanceContract.methods.transfer(account2, amount).send({ from: account1 });
    // console.log(`Transferred ${web3.utils.fromWei(amount, "ether")} tokens from account #1 to account #2`);
    // result = await allowanceContract.methods.balanceOf(account1).call();
    // console.log(`Balance of account #1: ${web3.utils.fromWei(result, "ether")}`);
    // result = await allowanceContract.methods.balanceOf(account2).call();
    // console.log(`Balance of account #2: ${web3.utils.fromWei(result, "ether")}`);
    // result = await allowanceContract.methods.totalSupply().call();
    // console.log(`Total Supply: ${web3.utils.fromWei(result, "ether")} tokens`);
}
run();
