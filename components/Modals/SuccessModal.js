import { Box, Button, Modal } from "@mui/material";
import SuccessMarkModal from "./SuccessMarkModal";
import { useEffect, useState } from "react";
import Link from "next/link";

export default ({ message, open, onClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
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
        <SuccessMarkModal open={showMark} />
      ) : (
        <>
          {open && (
            <Modal open={open} onClose={onClose}>
              <Box sx={style}>
                <div className="bg-transparent text-black p-2 text-3xl font-bold">
                  Success
                </div>
                <div className="bg-transparent text-blue-400 p-2 text-xl flex-wrap">
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
          )}
        </>
      )}
    </>
  );
};
