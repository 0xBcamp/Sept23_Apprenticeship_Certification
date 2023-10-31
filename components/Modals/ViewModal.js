import { Box, Button, List, ListItemText, Modal } from "@mui/material";

export default ({ members, open, onClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "#312e81",
    // border: "2px solid #fff",
    boxShadow: 24,
    p: 2,
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="bg-transparent text-black p-2 text-3xl font-bold">
          All Members
        </div>
        <div className="bg-transparent text-blue-200 p-2 text-xl">
          <p className="mt-4">
            <List sx={{ width: "100%" }}>
              {members.map((member, index) => {
                return <ListItemText id={index} primary={member} />;
              })}
            </List>
          </p>
        </div>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};
