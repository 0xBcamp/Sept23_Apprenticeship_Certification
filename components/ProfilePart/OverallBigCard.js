import { Card } from "web3uikit";
import OnChainChartCard from "../Cards/Charts/OnChainChartCard";
import ReputationChartCard from "../Cards/Charts/ReputationChartCard";

export default () => {
  return (
    <Card style={{ height: "20%" }}>
      <h1 className="text-2xl">Overall</h1>

      <div className="flex justify-around items-center">
        <OnChainChartCard />
        <ReputationChartCard />
      </div>
    </Card>
  );
};
