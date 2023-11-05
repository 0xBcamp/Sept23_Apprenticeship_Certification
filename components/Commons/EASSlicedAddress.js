import { Tooltip } from "@mui/material";

export default ({ Address }) => {
  return (
    <Tooltip title={Address}>
      <p>
        <b>{Address?.slice(0, 6) + "..." + Address?.slice(38, 42)}</b>
      </p>
    </Tooltip>
  );
};
