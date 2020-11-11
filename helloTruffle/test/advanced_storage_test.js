const AdvancedStorage = artifacts.require("AdvancedStorage");

contract("AdvancedStorage", () => {
  it("should add an element to ids array", async () => {
    const contract = await AdvancedStorage.deployed();
    await contract.addId(19);
    const result = await contract.getIthId(0);
    assert.equal(result.toNumber(), 19);
  });
});
