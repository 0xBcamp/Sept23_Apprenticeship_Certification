// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./SchemaResolver.sol";

contract BlockBadge is ERC1155, SchemaResolver {
    struct Certification {
        string apprenticeName;
        string certificationName;
        uint256 completedOnDate;
    }

    mapping(uint256 => Certification) public certifications;
    mapping(address => bool) public isMentor;

    uint256 private _currentTokenID;
    uint256 private bcampValue;
    uint256 private customStringValue;

    modifier onlyMentor() {
        require(isMentor[msg.sender], "Not a mentor");
        _;
    }

    constructor(
        address easAddress,
        string memory uri,
        uint256 _bcampValue,
        uint256 _customStringValue
    ) ERC1155(uri) SchemaResolver(easAddress) {
        bcampValue = _bcampValue;
        customStringValue = _customStringValue;
    }

    function registerCertification(
        string memory apprenticeName,
        string memory certificationName,
        uint256 completedOnDate
    ) external payable onlyMentor returns (uint256) {
        uint256 certificationCost = getCertificationCost(certificationName);
        require(msg.value == certificationCost, "Incorrect Ether sent");

        _currentTokenID++;

        certifications[_currentTokenID] = Certification({
            apprenticeName: apprenticeName,
            certificationName: certificationName,
            completedOnDate: completedOnDate
        });

        _mint(msg.sender, _currentTokenID, 1, "0x");

        return _currentTokenID;
    }

    function getCertificationCost(
        string memory certificationName
    ) public view returns (uint256) {
        if (
            keccak256(abi.encodePacked(certificationName)) ==
            keccak256(abi.encodePacked("BCamp"))
        ) {
            return bcampValue;
        } else {
            return customStringValue;
        }
    }

    function addMentor(address mentor) public onlyOwner {
        isMentor[mentor] = true;
    }

    function removeMentor(address mentor) public onlyOwner {
        isMentor[mentor] = false;
    }

    // schemaresolver abstract method
    function onAttest(
        Attestation calldata attestation,
        uint256 value
    ) internal override returns (bool) {
        if (isMentor[attestation.attester]) {
            // logic to mint nft
            return true;
        }
        return false;
    }

    function onRevoke(
        Attestation calldata /*attestation*/,
        uint256 /*value*/
    ) internal pure override returns (bool) {
        return true; // for now allowing revocations
    }
}
