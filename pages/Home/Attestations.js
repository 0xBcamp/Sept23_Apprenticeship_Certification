import dynamic from "next/dynamic";

const AttestCertification = dynamic(() =>
  import("../../Containers/Attestation/AttestCertification")
);
const AttestMessage = dynamic(() =>
  import("../../Containers/Attestation/AttestMessage")
);

const BNSMgmt = dynamic(() => import("../../Containers/Mgmt/BNSMgmt"));

import Link from "next/link";

export default () => {
  return (
    <>
      <Link href={"/Home"} className="Link__Back">
        Back
      </Link>
      <div className=" mb-24 flex flex-col  gap-24 container w-[50vw] mx-auto h-full">
        <AttestCertification />
        <AttestMessage />
        <BNSMgmt />
      </div>
    </>
  );
};
