import { Box, Button, Divider, Modal } from "@mui/material";
import ErrorMarkModal from "./ErrorMarkModal";
import { useEffect, useState } from "react";

export default ({ message, open, onClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#1171ef",
    // border: "2px solid #fff",
    boxShadow: 24,
    p: 2,
  };
  const [showMark, setShowMark] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setShowMark(false);
    }, 1000);
    // setShowMark(true);
  }, []);

  return (
    <>
      {showMark ? (
        <ErrorMarkModal open={showMark} />
      ) : (
        <Modal open={open} onClose={onClose}>
          <Box sx={style}>
            <div className="bg-transparent text-rose-500 p-2 text-3xl font-bold">
              Error
            </div>
            <Divider />
            <div className="bg-transparent text-rose-400 p-2 text-xl transform">
              {message}
            </div>
            <Button onClick={onClose}>Close</Button>
          </Box>
        </Modal>
      )}
    </>
  );
};
