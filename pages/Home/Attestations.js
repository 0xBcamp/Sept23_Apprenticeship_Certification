import dynamic from "next/dynamic";

const AttestCertification = dynamic(() =>
  import("../../Containers/Attestation/AttestCertification")
);
const AttestMessage = dynamic(() =>
  import("../../Containers/Attestation/AttestMessage")
);
import Link from "next/link";

export default () => {
  return (
    <>
      <Link href={"/Home"} className="Link__Back">
        Back
      </Link>
      <div className="h-screen mb-24 flex flex-col  gap-24 container w-[50vw] mx-auto h-full">
        <AttestCertification />
        <AttestMessage />
      </div>
    </>
  );
};
