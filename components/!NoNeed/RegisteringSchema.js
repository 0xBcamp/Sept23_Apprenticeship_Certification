import { useState } from "react";
import {
  EAS,
  SchemaEncoder,
  SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default () => {
  const [schemaUID, setSchemaUID] = useState("");
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

    const schemaEncoder = new SchemaEncoder("string name, string message");
    const encodeData = schemaEncoder.encodeData([
      { name: "name", value: name, type: "string" },
      { name: "message", value: message, type: "string" },
    ]);

    // const a = getSchemaUID(encodeData);
    // console.log(a);
    // return;

    // const schemaUID =
    //   "0xb28844791177681bd44d983e8aaa017f6a378e297271a46fd20d81a5cbadc386";
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

    ///
    const schemaRegistryContractAddress = "0xYourSchemaRegistryContractAddress";
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

    schemaRegistry.connect(signer);

    const schema = "uint256 eventId, uint8 voteIndex";
    const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
    const revocable = true;

    const transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable,
    });

    // Optional: Wait for transaction to be validated
    await transaction.wait();

    ///Getting Schema Information

    //     import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

    // const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
    // const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
    // schemaRegistry.connect(provider);

    // const schemaUID = "0xYourSchemaUID";

    // const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

    // console.log(schemaRecord);

    // // Example Output
    // {
    //   uid: '0xYourSchemaUID',
    //   schema: 'bytes32 proposalId, bool vote',
    //   resolver: '0xResolverAddress',
    //   revocable: true
    // }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        className="w-72 p-2 mt-4 Primary__Text"
        type="text"
        placeholder="Enter schemaUID..."
        value={schemaUID}
        onChange={(e) => setSchemaUID(e.target.value)}
      />{" "}
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
      />{" "}
      <input
        className="w-72 p-2 mt-4 Primary__Text"
        type="text"
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit} className="w-72 p-2 mt-4 Primary__Click">
        Submit Attestation
      </button>
      {isLoading && <p className="mt-4">Loading...</p>}
      {attestUID && <p className="mt-4">New Attest UID: {attestUID}</p>}
    </div>
  );
};
