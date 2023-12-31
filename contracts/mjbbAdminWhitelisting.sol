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
            allUsers.push(account);
            emit AdminRoleGranted(account, block.timestamp);
        }
    }

    function removeAdmin(address account) public nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        require(account != address(0), "Invalid address");
        if (hasRole(ADMIN_ROLE, account)) {
            revokeRole(ADMIN_ROLE, account);
            _removeUser(account);
            emit AdminRoleRevoked(account, block.timestamp);
        }
    }

    function batchAddAdmins(address[] memory accounts) public nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < accounts.length; i++) {
            require(accounts[i] != address(0), "Invalid address");
            if (!hasRole(ADMIN_ROLE, accounts[i])) {
                grantRole(ADMIN_ROLE, accounts[i]);
                allUsers.push(accounts[i]);  // Corrected this line
                emit AdminRoleGranted(accounts[i], block.timestamp);
            }
        }
    }

    function batchRemoveAdmins(address[] memory accounts) public nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < accounts.length; i++) {
            require(accounts[i] != address(0), "Invalid address");
            if (hasRole(ADMIN_ROLE, accounts[i])) {
                revokeRole(ADMIN_ROLE, accounts[i]);
                _removeUser(accounts[i]);
                emit AdminRoleRevoked(accounts[i], block.timestamp);
            }
        }
    }

    function _removeUser(address account) private {
        for (uint256 i = 0; i < allUsers.length; i++) {
            if (allUsers[i] == account) {
                allUsers[i] = allUsers[allUsers.length - 1];
                allUsers.pop();
                break;
            }
        }
    }

    function getAllAdmins() public view returns (address[] memory) {
        return allUsers;
    }

 

    function isAdmin(address account) public view returns (bool) {
        return hasRole(ADMIN_ROLE, account);
    }
}
