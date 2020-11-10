var SampleIntegration = artifacts.require("SampleIntegration");
var NFTFactory = artifacts.require("NFTFactory");

module.exports = function(deployer) {
  deployer.deploy(NFTFactory, "NFTFactory", "NFT");
  deployer.deploy(SampleIntegration);
};
