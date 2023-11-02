import dynamic from "next/dynamic";

const AttestCertification = dynamic(() =>
  import("../../Containers/Attestation/AttestCertification")
);
const AttestMessage = dynamic(() =>
  import("../../Containers/Attestation/AttestMessage")
);

const BNSMgmt = dynamic(() => import("../../Containers/Mgmt/BNSMgmt"));
const MentorsMgmt = dynamic(() => import("../../Containers/Mgmt/MentorsMgmt"));

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { createOrganizationResolverContract } from "../../utils/contractUtils";

export default () => {
  const { address } = useAccount();
  const [showMentorTab, setShowMentorTab] = useState(false);
  useEffect(() => {
    const showMentorTab = async () => {
      const contract = await createOrganizationResolverContract();

      const member = await contract.isOrganizationMember(address);

      if (member) setShowMentorTab(true);
      else setShowMentorTab(false);
    };
    showMentorTab();
  }, [address]);

  return (
    <>
      <Link href={"/Home"} className="Link__Back">
        Back
      </Link>
      <div className=" mb-24 flex flex-col  gap-24 container w-[50vw] mx-auto h-full">
        {showMentorTab && (
          <>
            <AttestCertification />
            <MentorsMgmt />
          </>
        )}
        <AttestMessage />
        <BNSMgmt />
      </div>
    </>
  );
};
