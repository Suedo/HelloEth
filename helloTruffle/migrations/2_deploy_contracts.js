const HelloBlock = artifacts.require("HelloBlock");
const CrowdFundingWithDeadline = artifacts.require("CrowdFundingWithDeadline");

module.exports = function (deployer) {
  deployer.deploy(HelloBlock);
  deployer.deploy(
    CrowdFundingWithDeadline(
      "funding",
      1,
      10,
      0x5a44795d21dfcb56cb31d423f62399ff503a27d5
    )
  );
};
