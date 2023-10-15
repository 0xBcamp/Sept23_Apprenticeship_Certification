// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { SchemaResolver } from "https://github.com/ethereum-attestation-service/eas-contracts/blob/f7f4ed8416fb66e23d0b94cd721ed3b1836ee243/contracts/resolver/SchemaResolver.sol";

import { IEAS, Attestation } from "https://github.com/ethereum-attestation-service/eas-contracts/blob/f7f4ed8416fb66e23d0b94cd721ed3b1836ee243/contracts/IEAS.sol";

/// @title AttesterResolver
/// @notice A sample schema resolver that checks whether the attestation is from a specific attester.
contract BlockBadge is SchemaResolver {
    address private immutable _targetAttester;

    constructor(IEAS eas, address mentorAddress) SchemaResolver(eas) {
        _targetAttester = mentorAddress;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal view override returns (bool) {
        return attestation.attester == _targetAttester;
    }

    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true;
    }
}
