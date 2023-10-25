import SidebarItems from "@/components/ProfilePart/SidebarPart/SidebarItems";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useEnsAddress } from "wagmi";
import ShowItem from "./ShowItem";
export default () => {
  const { name } = useEnsAddress({
    name: "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe",
  });
  console.log(name);
  const accountAddress = "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe";

  const [showTable, setShowTable] = useState("Overview");

  return (
    <div className="container">
      {/* {isWeb3Enabled ? ( */}
      <div
        className="flex flex-row justify-center h-screen bg-gradient-to-bl from-indigo-900 m-2"
        style={{ backgroundColor: "#2E2E48" }}
      >
        <div className="h-full">
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
      {/* ) : (
        <>Please connect your wallet</>
      )} */}
    </div>
  );
};
