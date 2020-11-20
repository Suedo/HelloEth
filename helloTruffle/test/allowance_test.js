const Allowance = artifacts.require("Allowance");
const truffleAssert = require("truffle-assertions");

contract("Allowance", (accounts) => {
  let contract;
  let owner;
  // contract owner gets fund from this account
  const bank = accounts[9];

  // these will be the guys getting allowances
  const kid1 = accounts[1];
  const kid2 = accounts[2];
  const kid3 = accounts[3];

  beforeEach(async () => {
    contract = await Allowance.deployed();
    owner = await contract.owner();
  });

  it("should have accounts[0] as the owner", async () => {
    assert.equal(accounts[0], owner);
  });

  it("should receive ether", async () => {
    const result = await contract.sendTransaction({
      from: bank,
      value: web3.utils.toWei("1"),
    });
    const balance = await contract.getBalance();
    assert.equal(balance, web3.utils.toWei("1"));

    // assert Received event was fired, with 1 ether in amount
    truffleAssert.eventEmitted(
      result,
      "Received",
      (ev) => ev.amount.toString() === web3.utils.toWei("1"),
      "Received event should fire with 1 ether as amount"
    );
  });

  it("can only give allowance money after setting limit", async () => {
    try {
      await contract.giveAllowanceMoney(kid1, web3.utils.toWei("0.2"));
      assert(false);
    } catch (err) {
      assert.equal(err.reason, "Cannot give more than allowance limit");
    }
  });

  it("need to have funds to give allowance money", async () => {
    try {
      await contract.giveAllowanceMoney(kid1, web3.utils.toWei("2"));
      assert(false);
    } catch (err) {
      assert.equal(err.reason, "Owner Balance Low");
    }
  });

  it("should only allow Owner to change allowance limits", async () => {
    try {
      await contract.giveAllowanceMoney(kid1, web3.utils.toWei("0.2"), {
        from: bank,
      });
      assert(false);
    } catch (err) {
      assert.equal(err.reason, "Ownable: caller is not the owner");
    }
  });
});
