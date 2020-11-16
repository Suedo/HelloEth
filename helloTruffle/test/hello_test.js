const Hello = artifacts.require("Hello");

contract("HelloWorld", () => {
  it("should return Hello", async () => {
    // method 1
    const helloContract = await Hello.deployed();
    const result = await helloContract.hello(); // await is mandatory here as well
    console.log(web3.utils.toWei("1")); // prints 1000000000000000000, proving web3 is available automatically in tests
    assert.equal(result, "Hello");

    // method 2, not using this as it can get cumbersome for non-trivial tests
    // return Hello.deployed()
    //   .then((instance) => instance.hello())
    //   .then((result) => {
    //     assert.equal(result, "Hello");
    //   });
  });
});
