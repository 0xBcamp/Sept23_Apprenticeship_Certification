import { useEffect, useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import Link from "next/link";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "../Commons";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default () => {
  const { isConnected } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const [apprenticeName, setApprenticeName] = useState("");
  const [certificationName, setCertificationName] = useState("");
  const [customFeedback, setCustomFeedback] = useState("");
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
    if (!apprenticeName) {
      alert("Please enter a apprenticeName!");
      return;
    }
    if (!certificationName) {
      alert("Please enter a certificationName!");
      return;
    }

    if (!customFeedback) {
      alert("Please enter a customFeedback!");
      return;
    }

    setIsLoading();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    const eas = new EAS(EASContractAddress);

    eas.connect(signer);

    // const schemaEncoder = new SchemaEncoder(
    //   "string apprenticeName, string certificationName, address mentorAddress, uint40 completedOnDate"
    // );

    // const encodeData = schemaEncoder.encodeData([
    //   { name: "apprenticeName", value: apprenticeName, type: "string" },
    //   { name: "certificationName", value: certificationName, type: "string" },
    //   { name: "mentorAddress", value: mentorAddress, type: "address" },
    //   { name: "completedOnDate", value: completedOnDate, type: "uint40" },
    // ]);

    const schemaEncoder = new SchemaEncoder(
      "string apprenticeName, string certificationName, string customFeedback"
    );

    const encodeData = schemaEncoder.encodeData([
      { name: "apprenticeName", value: apprenticeName, type: "string" },
      { name: "certificationName", value: certificationName, type: "string" },
      { name: "customFeedback", value: customFeedback, type: "string" },
    ]);

    const tx = await eas.attest({
      schema:
        "0x3fa53dac3a50eff2ae5f34f8c0b8366932db5bdd320cfe202592911da121266e",
      data: {
        recipient: address,
        expirationTime: 0,
        revocable: true,
        data: encodeData,
      },
    });

    setIsLoading(true);
    const newAttest = await tx.wait();
    setIsLoading(false);
    setAttestUID(newAttest);
  };
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);
  return (
    <>
      {connectionStat ? (
        <div className="flex flex-col grid-cols-2 items-center">
          <h1 className="text-xl font-bold">
            <TypeWriterOnce text="Add a Certificate" />
          </h1>
          <input
            className="w-72 p-2 mt-4 Primary__Text border"
            type="text"
            placeholder="Enter apprentice name..."
            value={apprenticeName}
            onChange={(e) => setApprenticeName(e.target.value)}
          />
          <input
            className="w-72 p-2 mt-4 Primary__Text border"
            type="text"
            placeholder="Enter certification name..."
            value={certificationName}
            onChange={(e) => setCertificationName(e.target.value)}
          />
          <input
            className="w-72 p-2 mt-4 Primary__Text border"
            type="text"
            placeholder="Enter address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="w-72 p-2 mt-4 Primary__Text border"
            type="text"
            placeholder="Your Feedback..."
            value={customFeedback}
            onChange={(e) => setCustomFeedback(e.target.value)}
          />
          {/* <DatePicker
          className="w-72 p-7 "
          label="Completed on date"
          value={completedOnDate}
          onChange={(e) => {
            setCompletedOnDate(e.date / 1000);
            console.log(e.date / 1000);
          }}
        /> */}

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
                {" "}
                Open EAS Scan
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
