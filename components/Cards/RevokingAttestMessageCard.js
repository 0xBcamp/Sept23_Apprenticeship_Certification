import { useState } from "react";
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default () => {
  const [schemaUID, setSchemaUID] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [attestInfo, setAttestInfo] = useState("");

  const revokingAttestationButton = async () => {
    setIsLoading();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    const eas = new EAS(EASContractAddress);

    eas.connect(signer);

    const tx = await eas.revoke({
      uid: schemaUID,
    });

    setIsLoading(true);
    const newAttest = await tx.wait();
    setIsLoading(false);

    setAttestInfo(newAttest);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="space-x-3">
        <input
          className="w-72 p-2 mt-4 Primary__Text"
          type="text"
          placeholder="Enter Schema UID..."
          value={schemaUID}
          onChange={(e) => setSchemaUID(e.target.value)}
        />
        <button
          onClick={revokingAttestationButton}
          className="w-72 p-2 mt-4 Primary__Click"
        >
          Revoking Attestation
        </button>
      </div>
      {isLoading && <p className="mt-4">Wait...</p>}

      {attestInfo && <p className="mt-4">Attest Info: {attestInfo}</p>}
    </div>
  );
};

// Output Exmaple

// {
//   uid: '0x5134f511e0533f997e569dac711952dde21daf14b316f3cce23835defc82c065',
//   schema: '0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a',
//   refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
//   time: 1671219600,
//   expirationTime: 0,
//   revocationTime: 1671219636,
//   recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
//   attester: '0x1e3de6aE412cA218FD2ae3379750388D414532dc',
//   revocable: true,
//   data: '0x0000000000000000000000000000000000000000000000000000000000000000'
// }
