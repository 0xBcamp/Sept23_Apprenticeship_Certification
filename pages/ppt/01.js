import { TypeWriterOnce } from "@/components/Commons";
import { useState } from "react";
import NavBar from "./NavBar";
import Link from "next/link";

export default () => {
  const [nextLine, setNextLine] = useState(0);

  const typingSpeed = 1500;
  const speed = "50";

  if (nextLine < 10) {
    setTimeout(() => {
      setNextLine(nextLine + 1);
    }, typingSpeed);
  }

  return (
    <>
      <NavBar back="0" next="2" />
      <div className="container mx-auto">
        {nextLine >= 1 && (
          <>
            <ul className="list-disc pl-4">
              <li>
                <TypeWriterOnce text={"Overall"} speed={speed} />
              </li>
            </ul>
            <div className="min-h-screen">
              <p className="text-4xl min-h-screen mb-6 text-center flex-wrap">
                BlockBadge Platform is a cutting-edge blockchain-based system
                designed to revolutionize the way credentials and certifications
                are managed and verified. It provides a secure, transparent, and
                tamper-proof infrastructure for individuals and organizations to
                issue, store, and validate digital badges, certificates, and
                credentials.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

`
License Identifier:

The contract specifies its licensing with a SPDX-License-Identifier comment, indicating that it is MIT-LICENSED.
Solidity Version:

The contract is written in Solidity version 0.8.21.
Imports:

The contract imports necessary modules such as IEAS, Attestation, and SchemaResolver from external libraries.
Contract Inheritance:

This contract inherits from SchemaResolver.
State Variables:

members: An array of addresses representing members of the organization.
isMember: A mapping that associates addresses with a boolean to check if an address is a member.
memberIndex: A mapping to store the index of a member in the members array.
owner: An address representing the owner of the contract.
organizationName: A public string variable for storing the organization's name.
Struct:

Attestation: A struct that holds an EASAttestation and a description string.
Constructor:

The constructor initializes the contract with an EAS instance, organization name, and initial members.
It requires that at least one initial member address is provided.
It populates the members array and the isMember mapping with initial members.
The contract deployer is set as the owner.
Modifier:

onlyOwner: A custom modifier that ensures only the owner can call certain functions.
Internal Functions:

onAttest: An internal function that verifies if an attester is a member of the organization.
onRevoke: An internal function that doesn't perform any specific logic for revocation in the provided code.
External Functions:

addToMembers: Allows the owner to add members to the organization.
removeFromMembers: Allows the owner to remove members from the organization.
getAllMembers: Retrieves the list of all members.
isOrganizationMember: Checks if a given address is a member of the organization.`;
