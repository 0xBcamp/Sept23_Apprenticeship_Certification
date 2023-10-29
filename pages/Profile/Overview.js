import CertificationBigCard from "@/components/ProfilePart/CertificationBigCard";
import OverallBigCard from "@/components/ProfilePart/OverviewBigCard";
import ReputationBigCard from "@/components/ProfilePart/ReputationBigCard";
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
