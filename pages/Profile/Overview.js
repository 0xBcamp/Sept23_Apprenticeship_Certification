import CertificationBigCard from "/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "/components/ProfilePart/OverviewBigCard";
import ReputationBigCard from "/components/ProfilePart/ReputationBigCard";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default ({ address }) => {
  // const { searchedAddress } = address;
  //, setAccountAddress] = useState("");
  // // const { address } = useAccount();

  // useEffect(() => {
  //   setAccountAddress(address);
  // }, [address]);
  return (
    <table>
      <tbody>
        <tr>
          <td colSpan="2" className="w-[1291px] h-[426px] justify-center">
            <OverallBigCard address={address} />
          </td>
        </tr>
        <tr>
          <td className="justify-center w-[593px] h-[504px]  items-center">
            <CertificationBigCard address={address} />
          </td>
          <td className="justify-center w-[593px] h-[504px]  items-center">
            <ReputationBigCard address={address} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
