import { TypeWriterOnce } from "@/components/Commons";
import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import NavBar from "./NavBar";
import Link from "next/link";

export default () => {
  const speed = "5";

  const [code, setCode] = useState();

  const [currentIndex, setCurrentIndex] = useState(0);

  const codeText = `// SPDX-License-Identifier: MIT-LICENSED
  pragma solidity 0.8.21;
  
  import {IEAS, Attestation as EASAttestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
  import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";
  
  contract OrganizationResolver is SchemaResolver {
      address[] private members;
      mapping(address => bool) private isMember;
      mapping(address => uint256) private memberIndex;
      address private owner;
      string public organizationName;
  
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
      ) internal view override returns (bool) {
          require(
              isMember[easAttestation.attester],
              "Not listed, please whitelist the address"
          );
          // Here we can handle the description if needed, for now, it's just ensuring that the attester is whitelisted.
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
  }`;

  if (currentIndex < codeText.length) {
    setTimeout(() => {
      setCode(codeText.substring(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);
  }

  return (
    <>
      <NavBar back="1" next="3" />
      <div className="container mx-auto">
        <header className="text-3xl font-bold mb-4 ">
          <TypeWriterOnce text="Resolver Contract" speed={speed} />
        </header>
        <Link
          className="xl"
          target="_blank"
          href={
            "https://sepolia.etherscan.io/tx/0xbbd90c0b6fdc4ddf6bc869eb19bf07b624955d470d04682bb630b4343a71cc45"
          }
        >
          https://sepolia.etherscan.io/tx/0xbbd90c0b6fdc4ddf6bc869eb19bf07b624955d470d04682bb630b4343a71cc45
        </Link>
        <br />
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="code-viewer"
          value={code}
          width="100%"
          height="700px"
          readOnly={true}
          fontSize={20}
          wrapEnabled={true}
        />
      </div>
    </>
  );
};
