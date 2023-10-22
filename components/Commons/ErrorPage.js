import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="flex flex-col">
          <h1 className="text-2xl">{CardName}</h1>
        </div>
        <p className="error-text">Error while loading...</p>
      </CardContent>
    </Card>
  );
};
