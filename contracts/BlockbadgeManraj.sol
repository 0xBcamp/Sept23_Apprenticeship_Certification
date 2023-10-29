// SPDX-License-Identifier: MIT-LICENSED
pragma solidity 0.8.21;

import {IEAS, Attestation as EASAttestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";
import {BlockBadgeSBT} from "./BlockBadgeSBT.sol";

contract OrganizationResolver is SchemaResolver {
    address[] private members;
    mapping(address => bool) private isMember;
    mapping(address => uint256) private memberIndex;
    address private owner;
    string public organizationName;

    BlockBadgeSBT public blockBadgesbt;

    struct Attestation {
        EASAttestation easAttestation;
        string description;
    }

    constructor(
        IEAS eas,
        string memory _organizationName,
        address[] memory initialMembers,
        address blockBadgeSBTAddress
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

        blockBadgesbt = BlockBadgeSBT(blockBadgeSBTAddress);

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
            isMember[easAttestation.attester],
            "Not listed, please whitelist the address"
        );
        // Here we can handle the description if needed, for now, it's just ensuring that the attester is whitelisted.

        //Mint the SBT and send to recpient of attestation

        blockBadgesbt._safeMint(easAttestation.recipient);
        return true;
    }

    function onRevoke(
        EASAttestation calldata /*easAttestation*/,
        uint256 /*value*/
    ) internal pure override returns (bool) {
        return true;
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
