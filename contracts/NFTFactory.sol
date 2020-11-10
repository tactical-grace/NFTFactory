pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/presets/ERC721PresetMinterPauserAutoId.sol";

/* import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/presets/ERC721PresetMinterPauserAutoId.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol"; */

contract NFT is ERC721PresetMinterPauserAutoId {
  constructor(string memory name, string memory symbol, string memory tokenURI)
      public
      ERC721PresetMinterPauserAutoId(
          name,
          symbol,
          tokenURI
      )
  {}
}

contract NFTFactory is Ownable() {

    address[] public contracts;
    address public lastContractAddress;
    address public bondedContract;

    mapping(address => bool) public ownedContracts;

    event deployedNFT (
        address indexed addr,
        string indexed name,
        string indexed symbol,
        string tokenURI
    );

    function bondContract(address _a) public onlyOwner returns(bool) {
        bondedContract = _a;
        return true;
    }

    function getContractCount() public view returns(uint contractCount) {
      return contracts.length;
    }

    function deployNFT(string memory name, string memory symbol, string memory tokenURI) public returns(NFT newContract) {
      require(msg.sender == owner() || msg.sender == bondedContract, "Only the owner or bonded contract can deploy new NFTs");

      NFT c = new NFT(name, symbol, tokenURI);
      address cAddr = address(c);
      contracts.push(cAddr);
      lastContractAddress = cAddr;

      ownedContracts[cAddr] = true;

      emit deployedNFT(cAddr, name, symbol, tokenURI);

      return c;
    }
    function mint(NFT _nft, address recipient) public {
      require(msg.sender == bondedContract, "Only the bonded contract can mint tokens");
      _nft.mint(recipient);
    }
}
