import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  SkeletonTextModal,
  ErrorPage,
  TypeWriterOnce,
} from "/components/Commons";
import SingleCard from "/components/ProfilePart/SingleReputationCard";
import { ContractContext } from "/Constants/Context/ContractContext";
import { useAccount } from "wagmi";
export default () => {
  const { GET_ATTESTATIONS_QUERY, addressFromSearchbar } =
    useContext(ContractContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(addressFromSearchbar);
  }, [addressFromSearchbar]);

  // const schema =
  //   "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";

  const schema =
    "0xd9858bc0a0b8b31f7547972c42827839baad9ac33bc43fb6499e58a2ddb56f8c";
  // const accountAddress = "0x6A5951dA6E9F0871e7Fa4D4EE785db0B3489eBb6";

  const {
    loading,
    error,
    data: eas,
  } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      account: address,
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
