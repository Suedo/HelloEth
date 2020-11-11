const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", () => {
  it("should set data", async () => {
    const contract = await SimpleStorage.deployed();
    await contract.setData("Data"); // await is mandatory here as well
    const result = await contract.data(); // accessing public variable of contract
    assert.equal(result, "Data");
  });
});

// https://ethereum.stackexchange.com/a/43143
// The above post gave me the idea on how to access public data
