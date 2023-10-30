// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlockBadgeSBT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string private TOKENURI = "";

    // "ipfs://bafkreicpi3flov6wmh534ryn33qububz4yt7nqa7e642sao3pyaglzlguu";

    constructor() ERC721("BlockBadgeSBT", "BLK") Ownable() {}

    function _safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setTokenURI(string memory _tokenURI) public {
        TOKENURI = _tokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return TOKENURI;
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
}
