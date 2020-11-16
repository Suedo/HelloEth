const AdvancedStorage = artifacts.require("AdvancedStorage");

contract("AdvancedStorage", () => {
  let contract;

  beforeEach(async () => {
    // https://www.trufflesuite.com/docs/truffle/reference/contract-abstractions#usage
    // contract = await AdvancedStorage.deployed(); // reuses contract, state not re-inited between tests
    contract = await AdvancedStorage.new(); // creates a new contract each time before a test
  });

  it("should add an element to ids array", async () => {
    await contract.addId(19);
    const result = await contract.getIthId(0);
    assert.equal(result.toNumber(), 19);
  });

  it("should get the ids array", async () => {
    await contract.addId(19);
    await contract.addId(8);
    const result = await contract.getAllIds();
    const ids = result.map((i) => i.toNumber()); // convert solidity array to js array
    // assert.deepEqual([19, 19, 8], ids); // if we were using  AdvancedStorage.deployed()
    assert.deepEqual([19, 8], ids);
  });
});
