const CrowdFunnding = artifacts.require("CrowdFundingWithDeadline");

contract("CrowdFundingWithDeadline", function (accounts) {
  let contract;
  let contractCreator = accounts[0];
  let beneficiary = accounts[1];

  const ONE_ETH = 1000000000000000000;

  beforeEach(async function (params) {
    contract = await CrowdFunnding.new(
      "funding",
      1, // fund amount
      10, // duration in mins
      beneficiary,
      {
        from: contractCreator,
        gas: 200000, // max amount of gas
      }
    );
  });

  it("contract is initialized", async function () {
    let campaignName = await contract.name.call();
    expect(campaignName).to.equal("funding");

    let targetAmount = await contract.targetAmount.call();
    expect(targetAmount.toNumber()).to.equal(ONE_ETH);

    let actualBeneficiary = await contract.beneficiary.call();
    expect(actualBeneficiary).to.equal(beneficiary);

    let status = await contract.status.call();
    expect(status.valueOf()).to.equal(0); // OnGoing
  });
});
