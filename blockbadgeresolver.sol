pragma solidity 0.8.21;

import { IEAS, Attestation } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { SchemaResolver } from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";

contract AttesterResolver is SchemaResolver {
    address[] private BcampMentors; // Array to store whitelisted addresses
    address private owner;

    constructor(IEAS eas, address[] memory BcampMentorsAddresses) SchemaResolver(eas) {
        for (uint256 i = 0; i < BcampMentorsAddresses.length; i++) {
            BcampMentors.push(BcampMentorsAddresses[i]); //Allows multiple BCamp mentor address inputs upon deployment
        }
        owner = msg.sender; // Set the owner when deploying the contract
    }

    //Restrict certain functions contract Owner only, only Contract Owners can add and remove mentors from whitelisted addresses
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _; 
    }

    //Attestor must be BCamp Mentor
    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal view override returns (bool) {
        return isBcampMentor(attestation.attester); 
    }

    // Standard revoke statement from EAS sample resolver
    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true; 
    }

    //Allows owner to add Mentor addresses to whitelisted address array
    function addToBcampMentors(address _address) public onlyOwner {
        BcampMentors.push(_address); 
    }

    //Allows owner to remove Mentor addresses to whitelisted address array
    function removeFromBcampMentors(address _address) public onlyOwner {
        for (uint256 i = 0; i < BcampMentors.length; i++) {
            if (BcampMentors[i] == _address) {
                BcampMentors[i] = BcampMentors[BcampMentors.length - 1];
                BcampMentors.pop();
                break; 
            }
        }
    }

    // Returns all current BCamp array addresses
    function getAllBcampMentors() public view returns (address[] memory)  {
        return BcampMentors; 
    }

    //Checks if address is in BCampMentors array
    function isBcampMentor(address _address) public view returns (bool) {
        for (uint256 i = 0; i < BcampMentors.length; i++) {
            if (BcampMentors[i] == _address) {
                return true;
            }
        }
        return false; 
    }
}