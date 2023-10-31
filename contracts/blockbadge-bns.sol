// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockBadgeBNS is Ownable {
    using Counters for Counters.Counter;

    // Event to log the registration of a new BNS name
    event NameRegistered(string bnsName, address indexed owner);

    // Mapping from BNS name to owner's address
    mapping(string => address) private nameToAddress;
    // Mapping from owner's address to their BNS name
    mapping(address => string) private addressToName;

    constructor() Ownable() {}

    // Modifier to ensure the BNS name is available
    modifier nameAvailable(string memory bnsName) {
        require(
            nameToAddress[bnsName] == address(0),
            "BNS name is already taken"
        );
        _;
    }

    // Modifier to ensure the sender owns the BNS name
    modifier ownsName(string memory bnsName) {
        require(
            nameToAddress[bnsName] == msg.sender,
            "You do not own this BNS name"
        );
        _;
    }

    // Modifier to ensure the sender doesn't already have a BNS name
    modifier noExistingName() {
        require(
            bytes(addressToName[msg.sender]).length == 0,
            "Address already has a BNS name"
        );
        _;
    }

    /**
     * @dev Register a BNS name for the sender's address
     * @param bnsName The desired BNS name (without the ".blockbadge" suffix)
     */
    function registerName(
        string memory bnsName
    ) external nameAvailable(bnsName) noExistingName {
        require(bytes(bnsName).length > 0, "BNS name cannot be empty");

        string memory fullBNS = string(
            abi.encodePacked(bnsName, ".blockbadge")
        );
        nameToAddress[fullBNS] = msg.sender;
        addressToName[msg.sender] = fullBNS;

        emit NameRegistered(fullBNS, msg.sender);
    }

    /**
     * @dev Resolve a BNS name to its associated address
     * @param bnsName The BNS name to resolve
     * @return The address associated with the given BNS name
     */
    function resolveName(
        string memory bnsName
    ) external view returns (address) {
        return nameToAddress[bnsName];
    }

    /**
     * @dev Resolve an address to its associated BNS name
     * @param addr The address to resolve
     * @return The BNS name associated with the given address
     */
    function resolveAddress(
        address addr
    ) external view returns (string memory) {
        return addressToName[addr];
    }

    /**
     * @dev Transfer ownership of a BNS name to another address
     * @param bnsName The BNS name to transfer
     * @param to The address to transfer the BNS name to
     */
    function transferName(
        string memory bnsName,
        address to
    ) external ownsName(bnsName) {
        require(to != address(0), "Cannot transfer to the zero address");

        nameToAddress[bnsName] = to;
        addressToName[to] = bnsName;
        addressToName[msg.sender] = ""; // Clear out the old mapping

        emit NameRegistered(bnsName, to);
    }
}
