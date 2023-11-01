import { useContext, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  SkeletonTextModal,
  ErrorPage,
  TypeWriterOnce,
} from "/components/Commons";
import SingleReputationCard from "/components/ProfilePart/SingleReputationCard";
import { ContractContext } from "/Constants/Context/ContractContext";
import { useAccount } from "wagmi";
export default ({ address }) => {
  const { GET_ATTESTATIONS_QUERY } = useContext(ContractContext);
  // const {searchedAddress}= address

  // const [accountAddress, setAccountAddress] = useState("");
  // const { address } = useAccount();

  // useEffect(() => {
  //   setAccountAddress(address);
  // }, [address]);

  const schema =
    "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";
  // const accountAddress = "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe";

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

  if (error) return <ErrorPage CardName="Reputations" />;
  return (
    <>
      {/* <Link href={"/Profile"} className="Link__Back">
        Back
      </Link> */}
      <h1 className="text-xl font-bold">
        <TypeWriterOnce text="Reputations" />
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
            return <SingleReputationCard item={item} />;
          })}
          {eas.attestations.length === 0 && (
            <div>There are no any feekback.</div>
          )}
        </div>
      )}
    </>
  );
};
