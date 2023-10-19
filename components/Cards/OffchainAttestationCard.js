import { useContext, useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { ContractContext } from "@/Context/ContractContext";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default () => {
  const { makeOffChainAttestation } = useContext(ContractContext);
  const { isWeb3Enabled } = useMoralis();
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [attestUID, setAttestUID] = useState(
    "0x8505c647d0bd479df4b346d571b0cdab77be750ea6c9810f729ceeda4014b8c5"
  );

  const handleSubmit = async () => {
    if (!address) {
      alert("Please enter an address!");
      return;
    }
    if (!message) {
      alert("Please enter a message!");
      return;
    }

    setIsLoading();

    const schemaEncoder = new SchemaEncoder("string message");

    const encodedData = schemaEncoder.encodeData([
      { name: "message", value: message, type: "string" },
    ]);

    const tx = await makeOffChainAttestation(
      "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f",
      address,
      false,
      encodedData
    );

    console.log(tx);
    // setIsLoading(true);
    // // const newAttest = await offchainAttestation.wait();
    // setIsLoading(false);
    setAttestUID(tx);
  };

  return (
    <>
      {isWeb3Enabled ? (
        <div className="flex flex-col grid-cols-1 gap-4 items-center">
          <div className="space-x-3">
            <input
              className="w-72 p-2  Primary__Text"
              type="text"
              placeholder="Enter address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-72 p-2  Primary__Text"
              type="text"
              placeholder="Your Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-72 p-2 mt-4 Primary__Click"
          >
            Submit Attestation
          </button>
          {isLoading && <p className="mt-4">Wait...</p>}
          {attestUID && (
            <p className="mt-4">
              New Attest UID:
              <Link
                href={`https://sepolia.easscan.org/attestation/view/${attestUID}`}
                target="_blank"
                className="underline"
              >
                {`https://sepolia.easscan.org/attestation/view/${attestUID}`}
              </Link>
            </p>
          )}
        </div>
      ) : (
        <>Please connect your wallet</>
      )}
    </>
  );
};

/*
string apprentice name
string certification name
address
uint40 Completed on date
 */

// // fields
// The attest function allows you to create an on-chain attestation for a specific schema. This function takes an object with the following properties:

// schema: The UID of the schema for which the attestation is being created.
// data: An object containing the following properties:
// recipient: The Ethereum address of the recipient of the attestation.
// expirationTime: A Unix timestamp representing the expiration time of the attestation. Use 0 for no expiration.
// revocable: A boolean indicating whether the attestation is revocable or not.
// refUID: (Optional) The UID of a referenced attestation. Use ZERO_BYTES32 if there is no reference.
// data: The encoded data for the attestation, which should be generated using the SchemaEncoder class.
