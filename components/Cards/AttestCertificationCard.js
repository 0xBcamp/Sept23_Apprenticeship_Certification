import { useEffect, useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import Link from "next/link";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "../Commons";
import { Button, Grow, Input } from "@mui/material";
import { ethers } from "ethers";
import SuccessModal from "../Modals/SuccessModal";
import ErrorModal from "../Modals/ErrorModal";
import DisplayLottie from "../DisplayLottie";
import WaitModal from "../Modals/WaitModal";
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default () => {
  const { isConnected } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const [apprenticeName, setApprenticeName] = useState("");
  const [certificationName, setCertificationName] = useState("");
  const [customFeedback, setCustomFeedback] = useState("");
  const [recipientAddress, setAddress] = useState("");

  const [attestUID, setAttestUID] = useState("");
  // "0x8505c647d0bd479df4b346d571b0cdab77be750ea6c9810f729ceeda4014b8c5"
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showWait, setShowWait] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!recipientAddress) {
      alert("Please enter an recipientAddress!");
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

    setIsLoading(false);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const eas = new EAS(EASContractAddress);
      eas.connect(signer);
      setIsLoading(true);

      const schemaEncoder = new SchemaEncoder(
        "string apprenticeName, string certificationName, string customFeedback"
      );

      const encodedData = schemaEncoder.encodeData([
        { name: "apprenticeName", value: apprenticeName, type: "string" },
        { name: "certificationName", value: certificationName, type: "string" },
        { name: "customFeedback", value: customFeedback, type: "string" },
      ]);

      const tx = await eas.attest({
        schema:
          "0x3fa53dac3a50eff2ae5f34f8c0b8366932db5bdd320cfe202592911da121266e",
        data: {
          recipient: recipientAddress,
          expirationTime: 0,
          revocable: true,
          data: encodedData,
        },
      });

      setShowWait(true);
      const newAttestId = await tx.wait();
      setShowWait(false);
      setIsLoading(false);
      setAttestUID(newAttestId);
      setOpenSuccess(true);
      setApprenticeName("");
      setCertificationName("");
      setCustomFeedback("");
      setAddress("");
    } catch (error) {
      if (error.message.toLowerCase().includes("not listed"))
        setErrorMessage(
          "This address is not in the whitelist, please add it to the whitelist."
        );
      else if (error.message.toLowerCase().includes("user rejected")) {
        setErrorMessage(
          "MetaMask Tx Signature: User denied transaction signature"
        );
      } else {
        setErrorMessage("Error occurred while processing.");
      }
      setOpenError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
      setShowWait(false);
    }
  };
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);
  return (
    <>
      {connectionStat ? (
        <div className="container h-screen">
          <div className="flex flex-col grid-cols-2 items-center">
            <h1 className="text-xl font-bold">
              <TypeWriterOnce text="Add a Certificate" />
            </h1>
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Enter apprentice name..."
                value={apprenticeName}
                onChange={(e) => setApprenticeName(e.target.value)}
              />
            </Grow>

            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Enter certification name..."
                value={certificationName}
                onChange={(e) => setCertificationName(e.target.value)}
              />
            </Grow>
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Enter recipientAddress..."
                value={recipientAddress}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grow>
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Your Feedback..."
                value={customFeedback}
                onChange={(e) => setCustomFeedback(e.target.value)}
              />
            </Grow>

            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-72 p-2 mt-4 button "
              >
                <div>
                  {isLoading ? (
                    <DisplayLottie
                      width={"100%"}
                      animationPath="/lottie/LoadingBlue.json"
                    />
                  ) : (
                    <p className="text-indigo-400">Attest</p>
                  )}
                </div>
              </Button>
            </Grow>

            {openError && (
              <ErrorModal
                message={errorMessage}
                open={openError}
                onClose={() => setOpenError(false)}
              />
            )}
            {attestUID && (
              <SuccessModal
                message={attestUID}
                open={openSuccess}
                onClose={() => setOpenSuccess(false)}
              />
            )}
            {showWait && <WaitModal open={showWait} onClose={showWait} />}
          </div>
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
