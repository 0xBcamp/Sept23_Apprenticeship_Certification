import { Box, Button, Modal, Tooltip } from "@mui/material";
import UploadFileToIPFSModal from "./UploadFileToIPFSModal";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { WifiProtectedSetup } from "@mui/icons-material";

const fileType = "image/png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 464,
  bgcolor: "#000000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ({
  file,
  logo = "/48681_BCAMP_RB_JK-01.png",
  name,
  certification,
  projectName,
  projectURL,
  cumulativeRate,
  fromDate,
  toDate,
  mvpAwarded,
  mvpAwardUrl,
}) => {
  const captureRef = useRef();
  const [open, setOpen] = useState(false);
  const [saveToIPFS, setSaveToIPFS] = useState(false);
  const [fileUploaded, setFileUploaded] = useState("");
  const handleOpen = () => {
    setFileUploaded("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOK = () => {
    setSaveToIPFS(true);
    handleClose();
  };

  function dataURLtoFile(dataURL, fileName) {
    const base64 = dataURL.split(",")[1];
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: fileType });

    return new File([blob], fileName, { type: fileType });
  }

  // Usage in handleCapture:
  const handleCapture = () => {
    if (!name) {
      alert("Please enter apprentice's Name");
      return;
    }
    html2canvas(captureRef.current).then((canvas) => {
      const image = canvas.toDataURL(fileType);
      const file = dataURLtoFile(image, `${name + ".png"}`);
      setFileUploaded(file);
    });
    handleOK();
  };

  return (
    <div>
      {saveToIPFS && fileUploaded && (
        <UploadFileToIPFSModal
          name={name}
          certification={certification}
          projectName={projectName}
          projectURL={projectURL}
          cumulativeRate={cumulativeRate}
          fromDate={fromDate}
          toDate={toDate}
          mvpAwardUrl={mvpAwardUrl}
          uploadFile={fileUploaded}
          onClose={(e) => {
            file(e);
            handleClose;
          }}
        />
      )}
      <Tooltip title="Don't have image, Generate One">
        <button
          className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
          onClick={handleOpen}
        >
          <WifiProtectedSetup color="info" />
        </button>
      </Tooltip>
      {/* <Button onClick={handleOpen}>Don't have image, Generate One</Button> */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Generated Image</h2>
          <div
            className="border-2 p-4 card bg-gradient-to-bl from-indigo-900"
            style={{ width: "400px", backgroundColor: "#2E2E48" }}
            ref={captureRef}
          >
            <div className="flex justify-between">
              <img src={logo} alt="logg" width={120} height={60} />
              {mvpAwarded && (
                <img src={"/MVPAward.png"} alt="mvpAwarded" width={30} />
              )}
            </div>
            <h2>Name: {name}</h2>
            <p className="text-white">Certification: {certification}</p>
            {projectName && (
              <p className="text-white">Project Name: {projectName}</p>
            )}
            {projectURL && (
              <p className="text-white">Project URL: {projectURL}</p>
            )}
            {cumulativeRate && (
              <p className="text-white">
                Project Cumulative Rate: {cumulativeRate} / 5
              </p>
            )}
            {fromDate && toDate && (
              <p className="text-white">
                From: {fromDate} To: {toDate}
              </p>
            )}
          </div>

          <Button onClick={handleCapture}>Ok</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};
