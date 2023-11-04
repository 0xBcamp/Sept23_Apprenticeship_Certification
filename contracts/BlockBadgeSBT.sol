// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title BlockBadgeSBT
 * @dev This contract represents an ERC721-compliant Soulbound Token (SBT) management system.
 */
contract BlockBadgeSBT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    /**
     * @dev Mapping to associate token IDs with their corresponding token URIs.
     */
    mapping(uint256 => string) private tokenURIs;

    constructor() ERC721("BlockBadgeSBT", "BLK") Ownable() {}

    /**
     * @dev Safely mints a new token to the specified address.
     * @param to The address to which the token will be minted.
     */
    function _safeMint(address to) public {
        uint256 tokenId = getLastTokenId();
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
    }

    /**
     * @dev Retrieves the token URI for a given token ID.
     * @param tokenId The ID of the token for which the URI is requested.
     * @return A string representing the token's URI.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }

    /**
     * @dev Overrides the transferFrom function to restrict transfers of Soulbound tokens.
     * @param from The sender's address.
     * @param to The recipient's address.
     * @param tokenId The ID of the token being transferred.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            from == address(0),
            "This is a Soulbound token. It cannot be transferred."
        );
        transferFrom(from, to, tokenId);
    }

    /**
     * @dev Sets the token URI for the latest token.
     * @param _tokenURI The URI to be associated with the latest token.
     */
    function _setTokenURI(string memory _tokenURI) public {
        uint256 tokenId = getLastTokenId();
        tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev Returns the token ID of the last minted token.
     * @return The token ID of the most recently minted token.
     */
    function getLastTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
