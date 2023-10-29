import CertificationBigCard from "@/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "@/components/ProfilePart/OverviewBigCard";
import ReputationBigCard from "@/components/ProfilePart/ReputationBigCard";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default () => {
  const [accountAddress, setAccountAddress] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    setAccountAddress(address);
  }, [address]);
  return (
    <table>
      <tbody>
        <tr>
          <td colSpan="2" className="w-[1291px] h-[426px] justify-center">
            <OverallBigCard account={accountAddress} />
          </td>
        </tr>
        <tr>
          <td className="justify-center w-[593px] h-[504px]  items-center">
            <CertificationBigCard account={accountAddress} />
          </td>
          <td className="justify-center w-[593px] h-[504px]  items-center">
            <ReputationBigCard account={accountAddress} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
