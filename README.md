## Deployment

`truffle migrate --reset`

* Deploy the NFT Factory first, save the address
* Deploy the SampleIntegration.
* Call `NFTFactory.bondContract($addressOfSampleIntegration)`
* Call `SampleIntegration.setNFTFactory($addressOfNFTFactory)`
* Finally, call `SampleIntegration.demo()`
* Verify the NFT transfer via calling `SampleIntegration.getNFT()`
* Load the NFT at the address from above
* Call `NFT.balanceOf($yourAccount)`

## Permissions

* The `ERC721PresetMinterPauserAutoId` contract sets who can mint tokens by default (to `msg.sender()`) - so only the person/contract deploying the NFT will be able to mint more of those NFTs


## Debugging

`truffle debug $TRANSACTION_HASH`
