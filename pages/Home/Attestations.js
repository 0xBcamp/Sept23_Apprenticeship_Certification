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
    <div className="h-full">
      <Link href={"/Home"} className="Link__Back">
        Back
      </Link>
      <div className="container mx-auto">
        <AttestCertification />
        <hr />
        <AttestMessage />
      </div>
    </div>
  );
};
