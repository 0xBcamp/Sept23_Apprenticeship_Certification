import CertificationBigCard from "/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "/components/ProfilePart/OverviewBigCard";
import ReputationBigCard from "/components/ProfilePart/ReputationBigCard";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default () => {
  const [accountAddress, setAccountAddress] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    setAccountAddress(address);
  }, [address]);
  return (
    <div className="flex flex-col gap-2 h-full">
      <OverallBigCard account={accountAddress} />
      <div className="flex h-full gap-2">
        <CertificationBigCard account={accountAddress} />
        <ReputationBigCard account={accountAddress} />
      </div>
    </div>
  );
};
