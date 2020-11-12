const Crud = artifacts.require("Crud");

contract("Crud", () => {
  let contract;

  beforeEach(async () => {
    contract = await Crud.deployed();
  });

  it("should create a new user", async () => {
    await contract.createUser("Luffy");
    const user = await contract.findUserById(1); // user is an array, but not js native, so cannot destructure
    // user === [id, name]
    assert.equal(1, user[0].toNumber());
    assert.equal("Luffy", user[1]);
  });

  it("should update a user", async () => {
    await contract.updateUser(1, "Robin");
    const user = await contract.findUserById(1);
    assert.equal(1, user[0].toNumber());
    assert.equal("Robin", user[1]);
  });

  it("should revert when trying to update non-existing record", async () => {
    try {
      await contract.updateUser(2, "Robin");
      assert(false); // reaching here means update was possible, which should not happen
    } catch (error) {
      assert(error.message.includes("User does not exist"));
    }
  });

  it("should delete a user", async () => {
    contract.deleteUserById(1);
    try {
      await contract.updateUser(1, "Robin");
      assert(false);
    } catch (error) {
      assert(error.message.includes("User does not exist"));
    }
  });
});
