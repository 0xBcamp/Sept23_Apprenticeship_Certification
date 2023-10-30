import Link from "next/link";
import { TypeWriterOnce } from "/components/Commons";

import OverveiwBigCard from "/components/ProfilePart/OverviewBigCard";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default () => {
  const [accountAddress, setAccountAddress] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    setAccountAddress(address);
  }, [address]);

  return (
    <>
      <Link href={"/Profile"} className="Link__Back">
        Back
      </Link>
      <h1 className="text-xl font-bold">
        <TypeWriterOnce text="Overall" />
      </h1>
      <OverveiwBigCard account={accountAddress} />
    </>
  );
};
