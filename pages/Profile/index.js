import SidebarItems from "/components/ProfilePart/SidebarPart/SidebarItems";
import Sidebar from "/components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ShowItem from "./ShowItem";
import { useRouter } from "next/router";
import { ContractContext } from "../../Constants/Context/ContractContext";

import { createBlockBadgeBNSContract } from "/utils/contractUtils";

export default () => {
  const router = useRouter();
  const { isConnected, address: myAddress } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const { setAddressFromSearchbar, setBNSFromSearchbar } =
    useContext(ContractContext);

  const { addressOrBNS } = router.query;
  useEffect(() => {
    const { id } = router.query;
    const checkURL = async () => {
      if (!id) {
        const contract = await createBlockBadgeBNSContract();
        const resolvedName = await contract.resolveAddress(myAddress);
        if (resolvedName) {
          setBNSFromSearchbar(resolvedName);
        } else {
          setBNSFromSearchbar("");
        }
      }
      setAddressFromSearchbar(myAddress);
    };

    checkURL();
  }, [myAddress]);
  useEffect(() => {
    const { page } = router.query;

    if (page == "Certifications") {
      setShowTable("Certifications");
      return;
    }
    if (page == "Overview") {
      setShowTable("Overview");
      return;
    }

    if (page == "Reputations") {
      setShowTable("Reputations");
      return;
    }
  }, [router.query.page]);

  const isEthereumAddress = addressOrBNS && addressOrBNS.startsWith("0x");
  const bnsName = isEthereumAddress ? null : addressOrBNS;
  const address = isEthereumAddress ? addressOrBNS : null;

  const [showTable, setShowTable] = useState("Overview");
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);
  return (
    <main className="flex items-center justify-center h-screen">
      {connectionStat ? (
        <div className="flex h-full gap-6">
          <div className="absolute left-24">
            <Sidebar>
              <SidebarItems
                text="Overview"
                onClickFunc={() => router.push("/Profile?page=Overview")}
                active={showTable == "Overview" ? true : false}
              />
              <SidebarItems
                text="Certifications"
                onClickFunc={() => router.push("/Profile?page=Certifications")}
                active={showTable == "Certifications" ? true : false}
              />
              <SidebarItems
                text="Reputations"
                onClickFunc={() => router.push("/Profile?page=Reputations")}
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
