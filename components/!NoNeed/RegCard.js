import { useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default () => {
  // const [schemaUID, setSchemaUID] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attestUID, setAttestUID] = useState("");

  const handleSubmit = async () => {
    setIsLoading();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const eas = new EAS(EASContractAddress);

    eas.connect(signer);
    return;

    // const schemaEncoder = new SchemaEncoder("string name, string message");

    const schemaEncoder = new SchemaEncoder(
      "string type, string participantAddress, \
      string internship, string startDate, string endDate, \
      string mentorAddress, string status, string hash"
    );

    const encodeData = schemaEncoder.encodeData([
      { name: "type", value: internshipCompletion, type: "string" },
      { name: "participantAddress", value: ethereumAddress, type: "string" },
      { name: "internship", value: internshipProvider, type: "string" },
      { name: "startDate", value: date, type: "string" },
      { name: "endDate", value: date, type: "string" },
      { name: "mentorAddress", value: ethereumAddress, type: "string" },
      { name: "status", value: status, type: "string" },
      { name: "hash", value: hashOfTheAboveDetail, type: "string" },
    ]);
    const tx = await eas.attest({
      schema: schemaUID
        ? schemaUID
        : "0xb28844791177681bd44d983e8aaa017f6a378e297271a46fd20d81a5cbadc386",
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

  return (
    <div className="flex flex-col grid-cols-2 items-center">
      <input
        className="w-72 p-2 mt-4 Primary__Text"
        type="text"
        placeholder="Enter name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-72 p-2 mt-4 Primary__Text"
        type="text"
        placeholder="Enter address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="w-72 p-2 mt-4 Primary__Text"
        type="text"
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={handleSubmit} className="w-72 p-2 mt-4 Primary__Click">
        Submit Registeration
      </button>
      {isLoading && <p className="mt-4">Wait...</p>}
      {attestUID && <p className="mt-4">New Attest UID: {attestUID}</p>}
    </div>
  );
};
