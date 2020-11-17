const Lottery = artifacts.require("Lottery");

contract("Lottery", (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await Lottery.deployed();
  });

  it("should show one lottery entry", async () => {
    // the receive method is a fallback, so we are not specifying it's name
    // https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#sending-ether-to-a-contract
    // https://github.com/trufflesuite/truffle/issues/743#issuecomment-357123885
    await contract.sendTransaction({
      from: accounts[0],
      value: web3.utils.toWei("0.1"), // 0.1 ether as wei
    });
    const players = await contract.getPlayers();
    assert.equal(players.length, 1);
  });

  it("should show two lottery entry", async () => {
    await contract.sendTransaction({
      from: accounts[1],
      value: web3.utils.toWei("0.1"), // 0.1 ether as wei
    });
    const players = await contract.getPlayers();
    assert.equal(players.length, 2);
  });

  it("lottery amount should reflect previous two entries", async () => {
    const result = await contract.totalAmount();
    // console.log("typeof result: ", typeof result, result);
    // console.log("\ntypeof toWei: ", typeof web3.utils.toWei("0.2"), web3.utils.toWei("0.2"));
    // https://ethereum.stackexchange.com/a/67094/22522
    assert.equal(result, web3.utils.toWei("0.2"));
  });

  it("should show the two entry addresses in order", async () => {
    const players = await contract.getPlayers();
    // console.log("players: ", players);
    // players:  [
    //   '0x6b318B9350E42bEB94f9Ae5e8b9DA854a6137628',
    //   '0x5A44795d21DFCb56cb31D423F62399FF503A27D5'
    // ]
    assert.deepEqual([accounts[0], accounts[1]], players);
  });

  it("should have accounts[0] as the owner", async () => {
    const owner = await contract.owner();
    assert.equal(accounts[0], owner);
  });

  it("non-owner account cannot release the Lottery", async () => {
    /* Structure of catched error object originating from a `require` : 
      {
        "reason": "<String given in require()>",
        "hijackedStack": "<callstack, including reason>"
      } 
    */
    try {
      await contract.throwDice({from: accounts[1]});
      assert(false);
    } catch (err) {
      // console.log("\ncatching err JSON: ", JSON.stringify(err.reason, null, 2));
      // assert(err); // just checked if err object was truthy
      assert.equal(err.reason, "Must be owner to throw dice");
    }
  });

  it("owner account is allowed release the Lottery", async () => {
    try {
      await contract.throwDice({from: accounts[0]});
      assert(true);
    } catch (err) {
      assert(false);
    }
  });
});
