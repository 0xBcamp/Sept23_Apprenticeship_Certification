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
import OrganizationResolverAbi from "../../Constants/OrganizationResolver.json";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const OrganizationResolverAddress =
  "0xaaCf8d59AF3e6404D7473d2275dbe89f5F01f11f";

export default () => {
  const { address } = useAccount();
  const [showMentorTab, setShowMentorTab] = useState(false);
  useEffect(() => {
    const showMentorTab = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        OrganizationResolverAddress,
        OrganizationResolverAbi,
        signer
      );

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
