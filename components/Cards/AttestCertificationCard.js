import { useEffect, useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "../Commons";
import { Button, Checkbox, Grow, Input, Tooltip } from "@mui/material";
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
import { Save } from "@mui/icons-material";
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
  const [mvpAwardUrl, setMvpAwardUrl] = useState("");

  const [mvpAwarded, setMVPAwarded] = useState(false);
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
    if (!mvpAwarded) setMvpAwardUrl("");
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
        "string Name,string CertificateName,string IPFSHash, string MVPAward"
      );

      // const completed = Passed ? "Yes" : "No";

      const encodedData = schemaEncoder.encodeData([
        { name: "Name", value: apprenticeName, type: "string" },
        { name: "CertificateName", value: certificateName, type: "string" },
        { name: "IPFSHash", value: ImageURL, type: "string" },
        { name: "MVPAward", value: mvpAwardUrl, type: "string" },
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
      setMvpAwardUrl("");
      setMVPAwarded(false);
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
                <TypeWriterOnce text="Certify Participant" />
              </h1>
              <div className="flex gap-2">
                <Input
                  className="text-white w-52 p-2 mt-2"
                  type="text"
                  placeholder="Participant name..."
                  value={apprenticeName}
                  onChange={(e) => setApprenticeName(e.target.value)}
                />
                <Input
                  className="text-white w-52 p-2 mt-2"
                  type="text"
                  placeholder="Participant address..."
                  value={recipientAddress}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  className="text-white w-52 p-2 mt-2"
                  type="text"
                  placeholder="Certification name..."
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.target.value)}
                />

                <Input
                  className="text-white w-52 p-2 mt-2"
                  type="text"
                  placeholder="Project name..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  className="text-white w-52 p-2 mt-2"
                  type="text"
                  placeholder="Project URL..."
                  value={projectURL}
                  onChange={(e) => setProjectURL(e.target.value)}
                />
                <Input
                  className="text-white w-52 p-2 mt-2"
                  type="text"
                  placeholder="Cumulative project rate..."
                  value={cumulativeRate}
                  onChange={(e) => setCumulativeRate(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <label className="text-white text-base p-2 mt-2">Date: </label>
                <input
                  className="bg-transparent"
                  onChange={(e) => setFromDate(e.target.value)}
                  type="date"
                />
                <label className="text-white text-base p-2 mt-2">to: </label>
                <input
                  className="bg-transparent"
                  onChange={(e) => setToDate(e.target.value)}
                  type="date"
                />
              </div>

              <div className="flex gap-2">
                <Checkbox
                  className="p-2 mt-2"
                  value={mvpAwarded}
                  onChange={(e) => setMVPAwarded(e.target.checked)}
                />
                <Input
                  className="text-white w-52 p-2 mt-2"
                  type="text"
                  placeholder="MVP Award URL..."
                  value={mvpAwardUrl}
                  disabled={!mvpAwarded}
                  onChange={(e) => setMvpAwardUrl(e.target.value)}
                />
              </div>
              {false && (
                <div className="flex gap-2">
                  <Input
                    className="text-white w-72 p-2 mt-2"
                    type="text"
                    placeholder="Enter ImageURL..."
                    value={ImageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </div>
              )}
              <div className="flex mt-2">
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
                    mvpAwardUrl={mvpAwardUrl}
                  />
                </div>
                <div className="m-2">
                  <GereratePNGModal
                    file={setImageURL}
                    name={apprenticeName}
                    certification={certificateName}
                    projectName={projectName}
                    projectURL={projectURL}
                    cumulativeRate={cumulativeRate}
                    fromDate={fromDate}
                    toDate={toDate}
                    mvpAwarded={mvpAwarded}
                    mvpAwardUrl={mvpAwardUrl}
                  />
                </div>
                <div className="m-2">
                  <Tooltip title="Attest">
                    <button
                      className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      <div>
                        {isLoading ? (
                          <DisplayLottie
                            width={"100%"}
                            animationPath="/lottie/LoadingBlue.json"
                          />
                        ) : (
                          <Save color="info" />
                        )}
                      </div>
                    </button>
                  </Tooltip>
                </div>
              </div>
              {/* 
              <Button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-72 mt-2 button font-semibold text-black"
              >
                <div>
                  {isLoading ? (
                    <DisplayLottie
                      width={"100%"}
                      animationPath="/lottie/LoadingBlue.json"
                    />
                  ) : (
                    <>Attest</>
                  )}
                </div>
              </Button> */}

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
