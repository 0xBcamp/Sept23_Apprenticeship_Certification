import { Box, Button, Modal, Tooltip } from "@mui/material";
import UploadFileToIPFSModal from "./UploadFileToIPFSModal";
import { useState } from "react";
import { CloudUpload } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#000000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ({
  file,
  name,
  certification,
  projectName,
  projectURL,
  cumulativeRate,
  fromDate,
  toDate,
  mvpAwardUrl,
}) => {
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
      <Tooltip title="Upload an Image">
        <button
          className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
          onClick={handleOpen}
        >
          <CloudUpload color="info" />
        </button>
      </Tooltip>
      {/* <Button onClick={handleOpen}>Upload an Image</Button> */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Upload a File</h2>

          <p for="file">Choose a file: </p>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={(e) => setFileUploaded(e.target.files[0])}
          />
          <br />
          <Button disabled={!fileUploaded} onClick={handleOK}>
            OK
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};
