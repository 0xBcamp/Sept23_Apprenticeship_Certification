import { Box, Button, Modal } from "@mui/material";

export default ({ message, open, onClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "#2E2E48",
    // border: "2px solid #fff",
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="bg-white text-red-900 p-2 text-3xl font-bold rounded">
          Error
        </div>
        <div className="bg-white text-red-700 p-2 text-xl transform rounded">
          {message}
        </div>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};
