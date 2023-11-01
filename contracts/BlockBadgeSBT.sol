// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlockBadgeSBT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => string) private tokenURIs; // Mapping tokenId to tokenURI

    constructor() ERC721("BlockBadgeSBT", "BLK") Ownable() {}

    function _safeMint(address to) public {
        uint256 tokenId = getLastTokenId();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal override {
        require(
            from == address(0),
            "This a Soulbound token. It cannot be transferred."
        );
        _safeTransfer(from, to, tokenId, data);
    }

    function _setTokenURI(string memory _tokenURI) public {
        uint256 tokenId = getLastTokenId();
        tokenURIs[tokenId] = _tokenURI;
    }

    function getLastTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
