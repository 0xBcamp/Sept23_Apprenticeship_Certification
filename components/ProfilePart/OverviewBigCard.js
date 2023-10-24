import OnChainChartCard from "../Cards/Charts/OnChainChartCard";
import ReputationChartCard from "../Cards/Charts/ReputationChartCard";
import CertificationChartCard from "../Cards/Charts/CertificationChartCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default () => {
  return (
    <div className="bigCard h-full w-full text-white ">
      <h1 className="text-2xl">Overview</h1>
      <div className="flex justify-around items-center">
        <OnChainChartCard />
        <CertificationChartCard />
        <ReputationChartCard />
      </div>
    </div>
  );
};
