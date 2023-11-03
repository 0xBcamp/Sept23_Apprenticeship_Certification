import { Box, Button, Modal } from "@mui/material";
import UploadFileToIPFSModal from "./UploadFileToIPFSModal";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

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

export default ({ file, logo = "/logo.png", name, certification }) => {
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
          date={"1000"}
          uploadFile={fileUploaded}
          onClose={(e) => {
            file(e);
            handleClose;
          }}
        />
      )}
      <Button onClick={handleOpen}>Don't have image, Generate One</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Generated Image</h2>
          <div
            className="border-2 p-4 card bg-gradient-to-bl from-indigo-900"
            style={{ width: "400px", backgroundColor: "#2E2E48" }}
            ref={captureRef}
          >
            <img src={logo} alt="" width={80} />
            <h2>Name: {name}</h2>
            <p className="text-white">Certification: {certification}</p>
          </div>

          <Button onClick={handleCapture}>Ok</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};
