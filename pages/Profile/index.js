import SidebarItems from "@/components/ProfilePart/SidebarPart/SidebarItems";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useAccount, useEnsAddress } from "wagmi";
import ShowItem from "./ShowItem";
export default () => {
  const { isConnected } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const { name } = useEnsAddress({
    name: "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe",
  });
  console.log(name);

  const [showTable, setShowTable] = useState("Overview");
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);
  return (
    <main className="container min-h-screen">
      {connectionStat ? (
        <div
          className="flex flex-row justify-center h-screen bg-gradient-to-bl from-indigo-900 m-2"
          style={{ backgroundColor: "#2E2E48" }}
        >
          <div className="h-screen">
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
          {showTable && <ShowItem item={showTable} />}
        </div>
      ) : (
        <>Please connect your wallet</>
      )}
    </main>
  );
};
