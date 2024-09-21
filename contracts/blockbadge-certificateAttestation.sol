// SPDX-License-Identifier: MIT-LICENSED
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";

contract CertificateAttestation is SchemaResolver, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(address => bool) private isMentor;
    mapping(address => bool) private isOrganizer;
    mapping(address => string) private mentorOrganizerTemplates; // IPFS hash of the template image
    mapping(uint256 => CertificateData) private certificateData; // Linking token IDs to their respective data

    struct CertificateData {
        string metadataURI;
        string ipfsHash; // IPFS hash of the stamped certificate
    }

    address private owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(
        IEAS eas,
        string memory name,
        string memory symbol
    ) SchemaResolver(eas) ERC721(name, symbol) {
        owner = msg.sender;
    }

    function addToMentors(
        address _mentor,
        string memory templateIPFS
    ) external onlyOwner {
        require(_mentor != address(0), "Cannot add zero address");
        require(!isMentor[_mentor], "Address is already a mentor");

        isMentor[_mentor] = true;
        mentorOrganizerTemplates[_mentor] = templateIPFS; // Store the template
    }

    function removeFromMentors(address _mentor) external onlyOwner {
        require(isMentor[_mentor], "Address is not a mentor");
        isMentor[_mentor] = false;
    }

    function addToOrganizers(
        address _organizer,
        string memory templateIPFS
    ) external onlyOwner {
        require(_organizer != address(0), "Cannot add zero address");
        require(!isOrganizer[_organizer], "Address is already an organizer");

        isOrganizer[_organizer] = true;
        mentorOrganizerTemplates[_organizer] = templateIPFS; // Store the template
    }

    function removeFromOrganizers(address _organizer) external onlyOwner {
        require(isOrganizer[_organizer], "Address is not an organizer");
        isOrganizer[_organizer] = false;
    }

    function mintCertificate(
        address candidate,
        string memory metadataURI,
        string memory stampedIPFSHash
    ) external {
        require(
            isMentor[msg.sender] || isOrganizer[msg.sender],
            "Not listed as mentor or organizer"
        );

        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(candidate, newTokenId);
        certificateData[newTokenId] = CertificateData({
            metadataURI: metadataURI,
            ipfsHash: stampedIPFSHash
        });
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _isTokenOwnerOrApproved(tokenId, msg.sender),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return certificateData[tokenId].ipfsHash;
    }

    function _isTokenOwnerOrApproved(
        uint256 tokenId,
        address account
    ) internal view returns (bool) {
        address tokenOwner = ownerOf(tokenId);
        return (tokenOwner == account ||
            getApproved(tokenId) == account ||
            isApprovedForAll(tokenOwner, account));
    }

    function getCertificateMetadataURI(
        uint256 tokenId
    ) external view returns (string memory) {
        return certificateData[tokenId].metadataURI;
    }

    function getIPFSHash(
        uint256 tokenId
    ) external view returns (string memory) {
        return certificateData[tokenId].ipfsHash;
    }

    function transferFrom(
        address /*from*/,
        address /*to*/,
        uint256 /*tokenId*/
    ) public pure override(ERC721, IERC721) {
        revert("Soul-bound certificates cannot be transferred.");
    }

    function approve(
        address /* to */,
        uint256 /* tokenId */
    ) public pure override(ERC721, IERC721) {
        revert("Soul-bound certificates cannot be approved.");
    }

    function setApprovalForAll(
        address /* operator */,
        bool /* approved */
    ) public pure override(ERC721, IERC721) {
        revert("Soul-bound certificates cannot set approval for all.");
    }

    function safeTransferFrom(
        address /*from*/,
        address /*to*/,
        uint256 /*tokenId*/,
        bytes memory /*_data*/
    ) public pure override(ERC721, IERC721) {
        revert("Soul-bound certificates cannot be transferred.");
    }

    function isApprovedForAll(
        address /* owner */,
        address /* operator */
    ) public pure override(ERC721, IERC721) returns (bool) {
        return false;
    }

    function onAttest(
        Attestation calldata /*attestation*/,
        uint256 /*value*/
    ) internal pure override returns (bool) {
        // You can add custom logic here if needed
        return true;
    }

    function onRevoke(
        Attestation calldata /*attestation*/,
        uint256 /*value*/
    ) internal pure override returns (bool) {
        // You can add custom logic here if needed
        return true;
    }
}
