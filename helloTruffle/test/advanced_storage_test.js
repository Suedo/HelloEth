const AdvancedStorage = artifacts.require("AdvancedStorage");

contract("AdvancedStorage", () => {
  let contract;

  beforeEach(async () => {
    contract = await AdvancedStorage.deployed();
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
    assert.deepEqual([19, 19, 8], ids); // WHY not [19, 8] ??
  });
});
