import Link from "next/link";
import { SkeletonTextModal, TypeWriterOnce } from "@/components/Commons";

import OverveiwBigCard from "@/components/ProfilePart/OverviewBigCard";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "@/Context/ContractContext";

export default () => {
  const { getMyAddress } = useContext(ContractContext);

  const [accountAddress, setAccountAddress] = useState("");

  useEffect(() => {
    const func = async () => {
      setAccountAddress(await getMyAddress());
    };
    func();
  }, []);
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
