import { Box, Modal } from "@mui/material";

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
        <div className="bg-white text-blue-900 p-2 text-xl flex-wrap rounded">
          <p className="mt-4">
            New Attest UID:{" "}
            <Link
              href={`https://sepolia.easscan.org/attestation/view/${message}`}
              target="_blank"
              className="underline"
            >
              Open EAS Scan
            </Link>
          </p>
        </div>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};
