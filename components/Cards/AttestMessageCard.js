import { useContext, useState } from "react";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useMoralis } from "react-moralis";
import Link from "next/link";
import { ContractContext } from "@/pages/Context/ContractContext";

export default () => {
  const { makeOnChainAttestation, getOnChainAttestation } =
    useContext(ContractContext);
  const { isWeb3Enabled } = useMoralis();
  const [address, setAddress] = useState(
    "0x728e124340b2807eD0cc5B2104eD5c07cceFa0Ec"
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attestUID, setAttestUID] = useState("");

  const handleSubmit = async () => {
    // console.log(
    //   await getOnChainAttestation(
    //     "0x78b53af05a9ab1ac5ec5a3f9fe7e977a96a2a6e1b32b9f1504d6b1459dab1f43"
    //   )
    // );
    // return;
    if (!address) {
      alert("Please enter an address!");
      return;
    }
    if (!message) {
      alert("Please enter a message!");
      return;
    }
    setIsLoading(false);

    const schemaEncoder = new SchemaEncoder("string Message");
    const encodeData = schemaEncoder.encodeData([
      { name: "Message", value: message, type: "string" },
    ]);

    const tx = await makeOnChainAttestation(
      "0xef178a6053ee7a49ae4fa1fc43585f6bc5f88818f13248cd26a2587df0af5b10",
      address,
      false,
      encodeData
    );

    console.log(tx);
    setAttestUID(tx);
    // setAddress();
    // setMessage();
  };

  return (
    <>
      {isWeb3Enabled ? (
        <div className="flex flex-col grid-cols-2 items-center">
          {/* <p>
        Schema id:
        <b>
          {" "}
          0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f
        </b>
      </p>
      <p>
        Schema:<b> string message</b>
      </p> */}
          <input
            className="w-72 p-2 mt-4 Primary__Text border"
            type="text"
            placeholder="Enter an address to attest..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="w-72 p-2 mt-4 Primary__Text"
            type="text"
            placeholder="Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-72 p-2 mt-4 Primary__Click"
          >
            Submit
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

// // fields
// The attest function allows you to create an on-chain attestation for a specific schema. This function takes an object with the following properties:

// schema: The UID of the schema for which the attestation is being created.
// data: An object containing the following properties:
// recipient: The Ethereum address of the recipient of the attestation.
// expirationTime: A Unix timestamp representing the expiration time of the attestation. Use 0 for no expiration.
// revocable: A boolean indicating whether the attestation is revocable or not.
// refUID: (Optional) The UID of a referenced attestation. Use ZERO_BYTES32 if there is no reference.
// data: The encoded data for the attestation, which should be generated using the SchemaEncoder class.

// schema uid of name and message
// 0xb28844791177681bd44d983e8aaa017f6a378e297271a46fd20d81a5cbadc386

// schema uid of
// MAKE A STATEMENT
// UID:
// 0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f

// schema uid of
// CONTENT HASH
// UID:
// 0xdf4c41ea0f6263c72aa385580124f41f2898d3613e86c50519fc3cfd7ff13ad4
