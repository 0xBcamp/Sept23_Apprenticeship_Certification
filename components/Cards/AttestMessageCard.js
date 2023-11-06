import { useEffect, useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import ErrorModal from "../Modals/ErrorModal";
import SuccessModal from "../Modals/SuccessModal";
import { useAccount } from "wagmi";
import { Button, Grow, Input } from "@mui/material";
import DisplayLottie from "../DisplayLottie";
import WaitModal from "../Modals/WaitModal";
import { TypeWriterOnce } from "../Commons";
import { reputationSchemaUID } from "../../utils/contractUtils";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default ({ addressFromProfile }) => {
  const { isConnected } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [attestUID, setAttestUID] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showWait, setShowWait] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!address) {
      alert("Please enter an address!");
      return;
    }
    if (!message) {
      alert("Please enter a message!");
      return;
    }
    setIsLoading(false);
    setOpenError(false);

    try {
      const eas = new EAS(EASContractAddress);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      eas.connect(signer);

      setIsLoading(true);

      const schemaEncoder = new SchemaEncoder("string message");
      const encodedData = schemaEncoder.encodeData([
        { name: "message", value: message, type: "string" },
      ]);

      const tx = await eas.attest({
        schema: reputationSchemaUID,
        data: {
          recipient: address,
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
      setAddress("");
      setMessage("");
    } catch (error) {
      if (error.message.toLowerCase().includes("user rejected")) {
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
  useEffect(() => {
    if (addressFromProfile) setAddress(addressFromProfile);
  }, [addressFromProfile]);
  return (
    <>
      {connectionStat ? (
        <div className="flex flex-col grid-cols-2 items-center">
          <h1 className="text-xl font-bold">
            <TypeWriterOnce text="Attest who you know" />
          </h1>
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
            <Input
              className="text-white w-72 p-2 mt-4"
              type="text"
              placeholder="Enter an address to attest..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grow>
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
            <Input
              className="text-white w-72 p-2 mt-4"
              type="text"
              placeholder="Your Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grow>
          <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-72 p-2 mt-4 button"
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
