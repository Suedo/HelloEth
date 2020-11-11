const HelloBlock = artifacts.require("HelloBlock");
const Hello = artifacts.require("Hello");
const SimpleStorage = artifacts.require("SimpleStorage");
const AdvancedStorage = artifacts.require("AdvancedStorage");
const CrowdFundingWithDeadline = artifacts.require("CrowdFundingWithDeadline");

module.exports = function (deployer) {
  deployer.deploy(HelloBlock);
  deployer.deploy(Hello);
  deployer.deploy(SimpleStorage);
  deployer.deploy(AdvancedStorage);
  const myAddress = "0x5a44795d21dfcb56cb31d423f62399ff503a27d5";
  deployer.deploy(CrowdFundingWithDeadline, "funding", 1, 10, myAddress);
};
