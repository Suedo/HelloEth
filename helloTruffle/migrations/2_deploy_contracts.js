const HelloBlock = artifacts.require("HelloBlock");

module.exports = function (deployer) {
  deployer.deploy(HelloBlock);
};
