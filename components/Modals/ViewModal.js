import { Box, Button, List, ListItemText, Modal, Paper } from "@mui/material";

export default ({ members, open, onClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 470,
    bgcolor: "#1171ef",
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
        <Paper className="bg-transparent max-h-[50vh] overflow-auto">
          <div className="bg-transparent text-blue-200 p-2 text-xl">
            {/* <div className="mt-4"> */}
            <List sx={{ width: "100%" }}>
              {members.map((member, index) => {
                return (
                  <ListItemText id={index} primary={member} className="pl-2" />
                );
              })}
            </List>
            {/* </div> */}
          </div>
        </Paper>
        <Button onClick={onClose} className="text-black hover:text-black">
          Close
        </Button>
      </Box>
    </Modal>
  );
};
