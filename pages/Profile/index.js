<<<<<<< HEAD
import CertificationBigCard from "@/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "@/components/ProfilePart/OverallBigCard";
import ReputationBigCard from "@/components/ProfilePart/ReputationBigCard";
import SidebarBigCard from "@/components/ProfilePart/SidebarPart/SidebarBigCard";
import { useMoralis } from "react-moralis";

export default () => {
  const { isWeb3Enabled, account } = useMoralis();

  return (
    <>
      {isWeb3Enabled ? (
        <>
          <table
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <tbody>
              <tr>
                <td style={{ width: "20%", height: "100%" }} rowSpan="2">
                  <SidebarBigCard account={account} />
                </td>
                <td colSpan="2">
                  <OverallBigCard account={account} />
                </td>
              </tr>
              <tr>
                <td style={{ width: "40%", height: "50%" }}>
                  <CertificationBigCard account={account} />
                </td>
                <td style={{ width: "40%", height: "50%" }}>
                  <ReputationBigCard account={account} />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <>Please connect your wallet</>
      )}
    </>
  );
};
=======
import CertificationBigCard from "@/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "@/components/ProfilePart/OverallBigCard";
import ReputationBigCard from "@/components/ProfilePart/ReputationBigCard";
import SidebarBigCard from "@/components/ProfilePart/SidebarPart/SidebarBigCard";
import { useMoralis } from "react-moralis";

export default () => {
  const { isWeb3Enabled, account } = useMoralis();

  return (
    <>
      {isWeb3Enabled ? (
        <>
          <table
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <tbody>
              <tr>
                <td style={{ width: "20%", height: "100%" }} rowSpan="2">
                  <SidebarBigCard account={account} />
                </td>
                <td colSpan="2">
                  <OverallBigCard account={account} />
                </td>
              </tr>
              <tr>
                <td style={{ width: "40%", height: "50%" }}>
                  <CertificationBigCard account={account} />
                </td>
                <td style={{ width: "40%", height: "50%" }}>
                  <ReputationBigCard account={account} />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <>Please connect your wallet</>
      )}
    </>
  );
};
>>>>>>> origin/alfaqi
