// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract bbAdminWhitelist is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address[] private allUsers;

    event AdminRoleGranted(address indexed account, uint256 timestamp);
    event AdminRoleRevoked(address indexed account, uint256 timestamp);

    constructor(address root) {
        _grantRole(DEFAULT_ADMIN_ROLE, root);
        _setRoleAdmin(ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(ADMIN_ROLE, root);
        allUsers.push(root);  // Add root to allUsers array
    }

    function addAdmin(address account) public nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        require(account != address(0), "Invalid address");
        if (!hasRole(ADMIN_ROLE, account)) {
            grantRole(ADMIN_ROLE, account);
            emit AdminRoleGranted(account, block.timestamp);
        }
    }

    function removeAdmin(address account) public nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        require(account != address(0), "Invalid address");
        if (hasRole(ADMIN_ROLE, account)) {
            revokeRole(ADMIN_ROLE, account);
            //emit AdminRoleRevoked(account, block.timestamp);
        }
    }

    function batchAddAdmins(address[] memory accounts) public nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < accounts.length; i++) {
            require(accounts[i] != address(0), "Invalid address");
            if (!hasRole(ADMIN_ROLE, accounts[i])) {
                grantRole(ADMIN_ROLE, accounts[i]);
                //emit AdminRoleGranted(accounts[i], block.timestamp);
            }
        }
    }

    function batchRemoveAdmins(address[] memory accounts) public nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < accounts.length; i++) {
            require(accounts[i] != address(0), "Invalid address");
            if (hasRole(ADMIN_ROLE, accounts[i])) {
                revokeRole(ADMIN_ROLE, accounts[i]);
                //emit AdminRoleRevoked(accounts[i], block.timestamp);
            }
        }
    }

    function getAllAdmins() public view returns (address[] memory) {
        address[] memory admins = new address[](allUsers.length);
        uint256 adminCount = 0;
        for (uint256 i = 0; i < allUsers.length; i++) {
            if (hasRole(ADMIN_ROLE, allUsers[i])) {
                admins[adminCount] = allUsers[i];
                adminCount++;
            }
        }

        // Resize the array to fit actual number of admins
        bytes memory resizedArray = new bytes(adminCount * 20);
        assembly { mstore(admins, adminCount) }

        return admins;
    }

    function getAllNonAdmins() public view returns (address[] memory) {
        address[] memory nonAdmins = new address[](allUsers.length);
        uint256 nonAdminCount = 0;
        for (uint256 i = 0; i < allUsers.length; i++) {
            if (!hasRole(ADMIN_ROLE, allUsers[i])) {
                nonAdmins[nonAdminCount] = allUsers[i];
                nonAdminCount++;
            }
        }

        // Resize the array to fit actual number of non-admins
        bytes memory resizedArray = new bytes(nonAdminCount * 20);
        assembly { mstore(nonAdmins, nonAdminCount) }

        return nonAdmins;
    }

    function isAdmin(address account) public view returns (bool) {
        return hasRole(ADMIN_ROLE, account);
    }

    
}
