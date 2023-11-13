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
import SuccessModal from "../Modals/SuccessModal";
import ErrorModal from "../Modals/ErrorModal";
import DisplayLottie from "../DisplayLottie";
import WaitModal from "../Modals/WaitModal";
import UploadFileModal from "../Modals/IPFS/UploadFileModal";
import GereratePNGModal from "../Modals/IPFS/GereratePNGModal";
import { ethers } from "ethers";
import {
  certificationSchemaUID,
  createBlockBadgeSBTContract,
} from "../../utils/contractUtils";
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default () => {
  const { isConnected } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const [apprenticeName, setApprenticeName] = useState("");

  const [certificateName, setCertificateName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [cumulativeRate, setCumulativeRate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [IPFSHash, setIPFSHash] = useState("");
  const [ImageURL, setImageURL] = useState("");

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

    setIsLoading(false);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const eas = new EAS(EASContractAddress);
      eas.connect(signer);

      setIsLoading(true);
      const contract = await createBlockBadgeSBTContract();

      const transaction = await contract._setTokenURI(ImageURL);
      await transaction.wait();

      const schemaUID = certificationSchemaUID;

      const schemaEncoder = new SchemaEncoder(
        "string Name,string CertificateName,string IPFSHash"
      );

      // const completed = Passed ? "Yes" : "No";

      const encodedData = schemaEncoder.encodeData([
        { name: "Name", value: apprenticeName, type: "string" },
        { name: "CertificateName", value: certificateName, type: "string" },
        { name: "IPFSHash", value: ImageURL, type: "string " },
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
      // setCertificateName("");
      setImageURL("");
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
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <div className="container h-screen">
            <div className="flex flex-col grid-cols-3  items-center">
              <h1 className="text-xl font-bold">
                <TypeWriterOnce text="Add a Certificate" />
              </h1>
              <div className="flex gap-2">
                <Input
                  className="text-white w-50 p-2 mt-2"
                  type="text"
                  placeholder="Enter apprentice name..."
                  value={apprenticeName}
                  onChange={(e) => setApprenticeName(e.target.value)}
                />
                <Input
                  className="text-white w-50 p-2 mt-2"
                  type="text"
                  placeholder="Enter recipient address..."
                  value={recipientAddress}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  className="text-white w-50 p-2 mt-2"
                  type="text"
                  placeholder="Enter certification name..."
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.target.value)}
                />

                <Input
                  className="text-white w-50 p-2 mt-2"
                  type="text"
                  placeholder="Enter Project Name..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <label className="text-white w-50 p-2 mt-2">Cohort Date</label>
                <input
                  className="bg-transparent"
                  onChange={(e) => setFromDate(e.target.value)}
                  type="date"
                />
                <input
                  className="bg-transparent"
                  onChange={(e) => setToDate(e.target.value)}
                  type="date"
                />
              </div>
              <div className="flex gap-2">
                <Input
                  className="text-white w-50 p-2 mt-2"
                  type="text"
                  placeholder="Enter Project URL..."
                  value={projectURL}
                  onChange={(e) => setProjectURL(e.target.value)}
                />
                <Input
                  className="text-white w-50 p-2 mt-2"
                  type="text"
                  placeholder="Enter Cumulative project rating..."
                  value={cumulativeRate}
                  onChange={(e) => setCumulativeRate(e.target.value)}
                />
              </div>
              {false && (
                <div className="flex gap-2">
                  <Input
                    className="text-white w-50 p-2 mt-2"
                    type="text"
                    placeholder="Enter ImageURL..."
                    value={ImageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </div>
              )}
              <div className="m-2">
                <UploadFileModal
                  file={setImageURL}
                  name={apprenticeName}
                  certification={certificateName}
                  projectName={projectName}
                  projectURL={projectURL}
                  cumulativeRate={cumulativeRate}
                  fromDate={fromDate}
                  toDate={toDate}
                />
              </div>
              <div>
                <GereratePNGModal
                  file={setImageURL}
                  name={apprenticeName}
                  certification={certificateName}
                  projectName={projectName}
                  projectURL={projectURL}
                  cumulativeRate={cumulativeRate}
                  fromDate={fromDate}
                  toDate={toDate}
                />
              </div>

              <Button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-50 p-2 mt-2 button"
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
        </Grow>
      ) : (
        <>Please connect your wallet</>
      )}
    </>
  );
};
