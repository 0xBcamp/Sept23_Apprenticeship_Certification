import SidebarItems from "/components/ProfilePart/SidebarPart/SidebarItems";
import Sidebar from "/components/Sidebar";
import { useEffect, useState } from "react";
import { useAccount, useEnsAddress } from "wagmi";
import ShowItem from "./ShowItem";
export default () => {
  const { isConnected } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const [showTable, setShowTable] = useState("Overview");
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);
  return (
    <main className="h-[1050px] w-[1738px]">
      {connectionStat ? (
        <table>
          <tbody>
            <tr>
              <td className="h-full">
                <div className="flex  flex-row justify-center ">
                  <Sidebar>
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
              <td>{showTable && <ShowItem item={showTable} />}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>Please connect your wallet</>
      )}
    </main>
  );
};
