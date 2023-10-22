import CertificationBigCard from "@/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "@/components/ProfilePart/OverviewBigCard";
import ReputationBigCard from "@/components/ProfilePart/ReputationBigCard";
import SidebarBigCard from "@/components/ProfilePart/SidebarPart/SidebarBigCard";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../Context/ContractContext";
// import { useMoralis } from "react-moralis";

export default () => {
  // const { isWeb3Enabled, account } = useMoralis();
  const { getMyAddress } = useContext(ContractContext);
  // const { account } = useMoralis();
  const [accountAddress, setAccountAddress] = useState("");

  useEffect(() => {
    const func = async () => {
      setAccountAddress(await getMyAddress());
    };
    func();
  }, []);
  return (
    <>
      {/* {isWeb3Enabled ? ( */}
      <>
        <table
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <tbody>
            <tr>
              <td style={{ width: "20%", height: "100%" }} rowSpan="2">
                <SidebarBigCard account={accountAddress} />
              </td>
              <td colSpan="2">
                <OverallBigCard account={accountAddress} />
              </td>
            </tr>
            <tr>
              <td style={{ width: "40%", height: "50%" }}>
                <CertificationBigCard account={accountAddress} />
              </td>
              <td style={{ width: "40%", height: "50%" }}>
                <ReputationBigCard account={accountAddress} />
              </td>
            </tr>
          </tbody>
        </table>
      </>
      {/* ) : (
        <>Please connect your wallet</>
      )} */}
    </>
  );
};
