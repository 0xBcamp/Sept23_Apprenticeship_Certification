import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <p className="error-text">Error while loading...</p>
      </CardContent>
    </Card>
  );
};
