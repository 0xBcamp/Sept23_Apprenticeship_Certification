// SPDX-License-Identifier: MIT-LICENSED
pragma solidity 0.8.21;

import {IEAS, Attestation as EASAttestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";

contract OrganizationResolver2 is SchemaResolver {
    address[] private members;
    mapping(address => bool) private isMember;
    mapping(address => uint256) private memberIndex;

    address[] private mentors;
    mapping(address => bool) private isMentor;

    address[] private organizers;
    mapping(address => bool) private isOrganizer;

    address private owner;
    string public organizationName;

    // Time window for revocation (2 minutes in seconds)
    uint256 private constant REVOKE_WINDOW = 2 * 60;

    // Mapping to track attestation timestamps
    mapping(address => uint256) private attestationTimestamps;

    struct Attestation {
        EASAttestation easAttestation;
        string description;
    }

    constructor(
        IEAS eas,
        string memory _organizationName,
        address[] memory initialMembers
    ) SchemaResolver(eas) {
        require(
            initialMembers.length > 0,
            "Must provide at least one member address"
        );
        organizationName = _organizationName;

        for (uint256 i = 0; i < initialMembers.length; i++) {
            address member = initialMembers[i];
            require(!isMember[member], "Duplicate member address provided");

            members.push(member);
            isMember[member] = true;
            memberIndex[member] = members.length - 1;
        }

        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function onAttest(
        EASAttestation calldata easAttestation,
        uint256 /*value*/
    ) internal override returns (bool) {
        require(
            isMentor[easAttestation.attester] ||
                isOrganizer[easAttestation.attester],
            "Not listed as mentor or organizer, please whitelist the address"
        );

        // Record the attestation timestamp
        attestationTimestamps[easAttestation.attester] = block.timestamp;

        return true;
    }

    function onRevoke(
        EASAttestation calldata easAttestation,
        uint256 /*value*/
    ) internal view override returns (bool) {
        require(
            block.timestamp <=
                attestationTimestamps[easAttestation.attester] + REVOKE_WINDOW,
            "Revocation time window has passed"
        );

        return true;
    }

    function addToMentors(address _mentor) external onlyOwner {
        require(_mentor != address(0), "Cannot add zero address");
        require(!isMentor[_mentor], "Address is already a mentor");

        mentors.push(_mentor);
        isMentor[_mentor] = true;
    }

    function removeFromMentors(address _mentor) external onlyOwner {
        require(isMentor[_mentor], "Address is not a mentor");

        isMentor[_mentor] = false; // Simply mark as not a mentor for gas optimization
    }

    function addToOrganizers(address _organizer) external onlyOwner {
        require(_organizer != address(0), "Cannot add zero address");
        require(!isOrganizer[_organizer], "Address is already an organizer");

        organizers.push(_organizer);
        isOrganizer[_organizer] = true;
    }

    function removeFromOrganizers(address _organizer) external onlyOwner {
        require(isOrganizer[_organizer], "Address is not an organizer");

        isOrganizer[_organizer] = false; // Simply mark as not an organizer for gas optimization
    }

    function addToMembers(address _address) external onlyOwner {
        require(_address != address(0), "Cannot add zero address");
        require(!isMember[_address], "Address is already a member");

        members.push(_address);
        isMember[_address] = true;
        memberIndex[_address] = members.length - 1;
    }

    function removeFromMembers(address _address) external onlyOwner {
        require(isMember[_address], "Address is not a member");

        uint256 indexToRemove = memberIndex[_address];
        address lastMember = members[members.length - 1];

        members[indexToRemove] = lastMember;
        memberIndex[lastMember] = indexToRemove;

        members.pop();
        delete isMember[_address];
        delete memberIndex[_address];
    }

    function getAllMembers() external view returns (address[] memory) {
        return members;
    }

    function isOrganizationMember(
        address _address
    ) external view returns (bool) {
        return isMember[_address];
    }
}
