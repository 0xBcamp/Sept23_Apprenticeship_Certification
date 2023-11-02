import CertificationBigCard from "/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "/components/ProfilePart/OverviewBigCard";
import ReputationBigCard from "/components/ProfilePart/ReputationBigCard";

export default () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <OverallBigCard />
      <div className="flex h-full gap-2">
        <CertificationBigCard />
        <ReputationBigCard />
      </div>
    </div>
  );
};
