import CertificationBigCard from "@/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "@/components/ProfilePart/OverviewBigCard";
import ReputationBigCard from "@/components/ProfilePart/ReputationBigCard";
import SidebarBigCard from "@/components/ProfilePart/SidebarPart/SidebarBigCard";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import { useEnsAddress } from "wagmi";

export default () => {
  const { name } = useEnsAddress({
    name: "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe",
  });
  console.log(name);
  // useEffect(() => {
  //   document.getElementById("navbar-main").style.display = "none";
  // }, []);
  const accountAddress = "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe";
  return (
    <>
      {/* {isWeb3Enabled ? ( */}
      <>
        <table className="table h-full">
          <tbody>
            <tr>
              <td className="w-1/5 h-full" rowSpan="2">
                <Sidebar>
                  <SidebarBigCard account={accountAddress} />
                </Sidebar>
              </td>
              <td colSpan="2" className=" h-full justify-center">
                <OverallBigCard account={accountAddress} />
              </td>
            </tr>
            <tr>
              <td className=" justify-center h-full items-center">
                <CertificationBigCard account={accountAddress} />
              </td>
              <td className=" justify-center h-full items-center">
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
