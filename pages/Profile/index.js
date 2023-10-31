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
    <main className="flex items-center justify-center">
      {connectionStat ? (
        <div className="flex h-full gap-6">
              <div className="absolute left-24">
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


              <div className="absolute h-[80vh] left-96 w-[70vw]">
                  {showTable && <ShowItem item={showTable} />}
              </div>
        </div>
      ) : (
        <>Please connect your wallet</>
      )}
    </main>
  );
};
