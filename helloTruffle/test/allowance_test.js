const Allowance = artifacts.require("Allowance");
const truffleAssert = require("truffle-assertions");

contract("Allowance", (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await Allowance.new();
  });

  it("should receive ether", async () => {
    const result = await contract.sendTransaction({
      from: accounts[1],
      value: web3.utils.toWei("1"),
    });
    const total = await contract.totalAmount();
    assert.equal(total, web3.utils.toWei("1"));

    // assert Received event was fired, with 1 ether in amount
    truffleAssert.eventEmitted(
      result,
      "Received",
      (ev) => ev.amount.toString() === web3.utils.toWei("1"),
      "Received event should fire with 1 ether as amount"
    );
  });
});
