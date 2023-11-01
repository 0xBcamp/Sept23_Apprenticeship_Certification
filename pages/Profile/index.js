import SidebarItems from "/components/ProfilePart/SidebarPart/SidebarItems";
import Sidebar from "/components/ProfilePart/SidebarPart/Sidebar";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ShowItem from "./ShowItem";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import BlockBadgeBNSAbi from "../../Constants/BlockBadgeBNS.json";
const BlockBadgeBNS = "0x353998eF92fE5990cDa2551AFC8967b5c2749adC";

export default () => {
  const { isConnected, address } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);
  const [searchedAddress, setSearchedAddress] = useState("");
  const [searchedBNSName, setSearchedBNSName] = useState("");
  const router = useRouter();

  const [showTable, setShowTable] = useState("Overview");
  useEffect(() => {
    setConnectionStat(isConnected);
    const { id } = router.query;
    const newName = String(id); //.toLocaleLowerCase().trim();
    const lastPart = ".blockbadge";

    const handleSearchAddress = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        BlockBadgeBNS,
        BlockBadgeBNSAbi,
        signer
      );

      if (newName.endsWith(lastPart)) {
        const resolvedAddress = await contract.resolveName(newName);
        setSearchedAddress(resolvedAddress);
        setSearchedBNSName(newName);
      } else {
        setSearchedAddress(address);
        setSearchedBNSName("");
      }
    };

    handleSearchAddress();
  }, [isConnected, router.query.id]);
  return (
    <main className="h-[1050px] w-[1738px]">
      {connectionStat ? (
        <table>
          <tbody>
            <tr>
              <td className="h-full">
                <div className="flex  flex-row justify-center ">
                  <Sidebar address={{ searchedAddress, searchedBNSName }}>
                    <SidebarItems
                      text="Overview"
                      onClickFunc={() => setShowTable("Overview")}
                      active={showTable == "Overview" ? true : false}
                    />
                    <SidebarItems
                      text="Certifications"
                      onClickFunc={() => setShowTable("Certifications")}
                      active={showTable == "Certifications" ? true : false}
                    />
                    <SidebarItems
                      text="Reputations"
                      onClickFunc={() => setShowTable("Reputations")}
                      active={showTable == "Reputations" ? true : false}
                    />
                  </Sidebar>
                </div>
              </td>
              <td>
                {showTable && (
                  <ShowItem
                    item={showTable}
                    address={{ searchedAddress, searchedBNSName }}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>Please connect your wallet</>
      )}
    </main>
  );
};
