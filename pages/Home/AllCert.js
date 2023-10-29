import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  SkeletonTextModal,
  ErrorPage,
  TypeWriterOnce,
} from "@/components/Commons";
import SingleCard from "@/components/ProfilePart/SingleReputationCard";
import { ContractContext } from "@/Constants/Context/ContractContext";
import { useAccount } from "wagmi";
export default () => {
  const { GET_ATTESTATIONS_QUERY } = useContext(ContractContext);
  const [accountAddress, setAccountAddress] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    setAccountAddress(address);
  }, [address]);

  // const schema =
  //   "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";

  const schema =
    "0xef178a6053ee7a49ae4fa1fc43585f6bc5f88818f13248cd26a2587df0af5b10";
  // const accountAddress = "0x6A5951dA6E9F0871e7Fa4D4EE785db0B3489eBb6";

  const {
    loading,
    error,
    data: eas,
  } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      account: accountAddress,
      schema: schema,
    },
  });

  if (error) return <ErrorPage CardName="Certifications" />;

  return (
    <>
      {/* <Link href={"/Profile"} className="Link__Back">
        Back
      </Link> */}
      <h1 className="text-xl font-bold">
        <TypeWriterOnce text="Certifications" />
      </h1>
      {loading ? (
        <div className="space-y-2">
          <SkeletonTextModal />
          <SkeletonTextModal />
          <SkeletonTextModal />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {eas.attestations.map((item) => {
            return <SingleCard item={item} />;
          })}
          {eas.attestations?.length === 0 && (
            <div>There are no any certificates.</div>
          )}
        </div>
      )}
    </>
  );
};
