import { Box, Button, Modal } from "@mui/material";
import UploadFileToIPFSModal from "./UploadFileToIPFSModal";
import { useState } from "react";

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

export default ({ file }) => {
  const [open, setOpen] = useState(false);
  const [returnUploadedFile, setReturnUploadedFile] = useState("");
  const [saveToIPFS, setSaveToIPFS] = useState(false);
  const [fileUploaded, setFileUploaded] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOK = () => {
    file(returnUploadedFile);
    setSaveToIPFS(true);
    handleClose();
  };

  return (
    <div>
      {saveToIPFS && (
        <UploadFileToIPFSModal
          name={fileUploaded.name}
          date={"1000"}
          uploadFile={fileUploaded}
          onClose={handleClose}
          returnUploadedFile={(ee) => setReturnUploadedFile(ee)}
        />
      )}
      <Button onClick={handleOpen}>Choose a file</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Upload a File</h2>

          <p for="file">Choose a file:</p>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .png, .gif"
            onChange={(e) => setFileUploaded(e.target.files[0])}
          />
          <br />
          <Button onClick={handleOK}>OK</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};
