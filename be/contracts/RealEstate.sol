// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {
    uint256 private _tokenIdCounter;

    constructor() ERC721("Real Estate", "RE") {}

    function mint(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = _tokenIdCounter;
        _mint(msg.sender , newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIdCounter += 1;

        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}