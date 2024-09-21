import { Box, Modal } from "@mui/material";
import DisplayLottie from "../DisplayLottie";

export default ({ open, onClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "#2E2E48",
    // border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <DisplayLottie width={"100%"} animationPath="/lottie/CheckError.json" />
      </Box>
    </Modal>
  );
};
