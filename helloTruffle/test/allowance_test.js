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

  // enum ChangeType of Contract
  const none = 0;
  const increase = 1;
  const decrease = 2;

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

  it("should set allowance limits to non-zero: method 1", async () => {
    try {
      const value = web3.utils.toWei("0.2");
      // https://ethereum.stackexchange.com/a/90342/22522
      const newLimit = await contract.changeAllowanceLimit.call(kid1, value, none);
      assert.equal(value, newLimit);
    } catch (err) {
      console.log("error:\n", err);
      assert(false);
    }
  });

  it(".call does not persist state change", async () => {
    /*
    in the previous test, titled:
    it("should set allowance limits to non-zero"...)
    we used `contract.setAllowance.call` 
    while that changes the state inside the method, those changes did not persist in the contract
    as a result, now, when we check the allowance, it will not have updated
    */

    const allowance = await contract.getAllowance(kid1);
    assert.equal(allowance, 0);
  });

  it("should PERSIST allowance limit change to non-zero", async () => {
    try {
      const value = web3.utils.toWei("0.2");
      const newLimit = await contract.changeAllowanceLimit(kid1, value, none);
      // we do not get return value, only TX object
      // thus we must assert events
      truffleAssert.eventEmitted(
        newLimit,
        "AllowanceLimitChange",
        (ev) => ev.newLimit.toString() === value,
        "AllowanceLimitChange event should be triggered"
      );
      const newAllowance = await contract.getAllowance(kid1);
      assert.equal(newAllowance, value);
    } catch (err) {
      console.log("error:\n", err);
      assert(false);
    }
  });

  it("should presist increased limits properly", async () => {
    try {
      const before = web3.utils.toWei("0.2");
      const after = web3.utils.toWei("0.4");
      const newLimit = await contract.changeAllowanceLimit(kid1, before, increase);

      truffleAssert.eventEmitted(
        newLimit,
        "AllowanceLimitChange",
        (ev) => ev.newLimit.toString() === after,
        "Allowance state should get updated to .4 ether"
      );
      const newAllowance = await contract.getAllowance(kid1);
      assert.equal(newAllowance, after);
    } catch (err) {
      console.log("error:\n", err);
      assert(false);
    }
  });

  it("should transfer fund properly when giving allowance", async () => {
    const transferAmount = web3.utils.toWei("0.3");
    const result = await contract.giveAllowanceMoney(kid1, transferAmount);
    const newOwnerBalance = await contract.getBalance();
    const newKidBalance = await contract.getBalance({from: kid1});

    assert.equal(newKidBalance, transferAmount);
    assert.equal(newOwnerBalance, web3.utils.toWei("0.7")); // owner balance 1 ether initially
    truffleAssert.eventEmitted(result, "AllowanceChange", (ev) => ev.currentBalance.toString() === transferAmount);
  });

  it("allowance should be withdrawable", async () => {
    // kid1 got 0.3 ether as allowance in last test, lets try to withdraw some of it
    const amt = web3.utils.toWei("0.1");
    const result = await contract.withdraw(amt, {from: kid1});
    const newKidBalance = await contract.getBalance({from: kid1});
    assert.equal(newKidBalance, web3.utils.toWei("0.2")); // .3 - .1 = .2
    truffleAssert.eventEmitted(result, "Transfer");
  });
});
