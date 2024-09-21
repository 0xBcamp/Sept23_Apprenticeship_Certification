import OnChainChartCard from "../Cards/Charts/OnChainChartCard";
import ReputationChartCard from "../Cards/Charts/ReputationChartCard";
import CertificationChartCard from "../Cards/Charts/CertificationChartCard";

export default () => {
  return (
    <div className="bigCard border-2 border-black h-full w-full text-white ">
      <h1 className="text-2xl">Overview</h1>
      <div className="flex justify-around items-center">
        <OnChainChartCard />
        <CertificationChartCard />
        <ReputationChartCard />
      </div>
    </div>
  );
};
