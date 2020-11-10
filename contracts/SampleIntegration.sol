pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFTFactory.sol";

/* import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol"; */

contract SampleIntegration is Ownable() {
  NFTFactory public NFTFactoryInstance;
  NFT public NFTInstance;

  constructor() public Ownable() {}

  function demo() public returns(bool) {

    /* Do some stuff */

    require(address(NFTFactoryInstance) != address(0));

    NFTFactoryInstance.mint(NFTInstance, msg.sender);

    return true;
  }

  function setNFTFactory(NFTFactory _NFTFactory) public onlyOwner returns(bool) {
    NFTFactoryInstance = _NFTFactory;
    NFTInstance = NFTFactoryInstance.deployNFT("ExampleNFT", "ENFT", "eth.pray.love");
    return true;
  }

  function getNFT() public view returns (NFT) {
    return NFTInstance;
  }
}
