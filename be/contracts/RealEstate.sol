// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {

    constructor() ERC721("Real Estate", "RE") {}

    function mint(uint256 _newItemId, string memory tokenURI) public {
        uint256 newItemId = _newItemId;
        _mint(msg.sender , newItemId);
        _setTokenURI(newItemId, tokenURI);
    }
}