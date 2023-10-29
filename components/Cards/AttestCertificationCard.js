import { useEffect, useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "../Commons";
import {
  Button,
  FormControl,
  Grow,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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

  const [certificateName, setCertificateName] = useState("");
  const [Passed, setPassed] = useState("");

  const [recipientAddress, setAddress] = useState("");

  const [attestUID, setAttestUID] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showWait, setShowWait] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!recipientAddress) {
      alert("Please enter the recipient address!");
      return;
    }
    if (!apprenticeName) {
      alert("Please enter apprentice name!");
      return;
    }
    if (!certificateName) {
      alert("Please enter a certificate name!");
      return;
    }

    // if (!Passed) {
    //   alert("Please enter a passed!");
    //   return;
    // }

    setIsLoading(false);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const eas = new EAS(EASContractAddress);
      eas.connect(signer);

      setIsLoading(true);

      const schemaUID =
        "0xf0749a6c351d57ba2ddc7e5e2372c64688b7b68c01ed0f6bfd8dc3b0323f5d4c";

      const schemaEncoder = new SchemaEncoder(
        "string Name,string CertificateName,bool Complated"
      );

      const encodedData = schemaEncoder.encodeData([
        { name: "Name", value: apprenticeName, type: "string" },
        { name: "CertificateName", value: certificateName, type: "string" },
        { name: "Complated", value: Passed, type: "bool" },
      ]);

      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: recipientAddress,
          expirationTime: 0,
          revocable: false,
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
      setCertificateName("");
      setPassed(false);
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
  const handleChange = (event) => {
    if (event.target.value == 1) setPassed(true);
    else setPassed(false);
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
                value={certificateName}
                onChange={(e) => setCertificateName(e.target.value)}
              />
            </Grow>
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Enter recipient address..."
                value={recipientAddress}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grow>
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <FormControl fullWidth className="w-72 p-2 mt-4">
                <InputLabel className="text-white">Passed</InputLabel>
                <Select
                  className="text-white"
                  value={Passed ? 1 : 2}
                  label="Passed"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={2}>No</MenuItem>
                </Select>
              </FormControl>
              {/* <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Your Feedback..."
                value={Passed}
                onChange={(e) => setPassed(e.target.value)}
              /> */}
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
