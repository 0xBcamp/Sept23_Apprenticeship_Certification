import SidebarItems from "/components/ProfilePart/SidebarPart/SidebarItems";
import Sidebar from "/components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ShowItem from "./ShowItem";
import { useRouter } from "next/router";
import { ContractContext } from "../../Constants/Context/ContractContext";

export default () => {
  const router = useRouter();
  const { isConnected, address: myAddress } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const { setAddressFromSearchbar, setBNSFromSearchbar } =
    useContext(ContractContext);

  const { addressOrBNS } = router.query;
  const { id } = router.query;
  if (!id) {
    setAddressFromSearchbar(myAddress);
    setBNSFromSearchbar("");
  }

  const isEthereumAddress = addressOrBNS && addressOrBNS.startsWith("0x");
  const bnsName = isEthereumAddress ? null : addressOrBNS;
  const address = isEthereumAddress ? addressOrBNS : null;

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
