import OnChainChartCard from "../Cards/Charts/OnChainChartCard";
import ReputationChartCard from "../Cards/Charts/ReputationChartCard";
import CertificationChartCard from "../Cards/Charts/CertificationChartCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <h1 className="text-2xl">Overall</h1>
        <div className="flex justify-around items-center">
          <OnChainChartCard />
          <CertificationChartCard />
          <ReputationChartCard />
        </div>
      </CardContent>
    </Card>
  );
};
