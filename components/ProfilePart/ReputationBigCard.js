import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { SkeletonTextModal, ErrorPage } from "/components/Commons";
import SingleReputationCard from "./SingleReputationCard";
import { ContractContext } from "/Constants/Context/ContractContext";
import { reputationSchemaUID } from "../../utils/contractUtils";

export default ({ seeMoreRepu }) => {
  const { GET_ATTESTATIONS_QUERY, addressFromSearchbar } =
    useContext(ContractContext);
  const [address, setAddress] = useState("");
  const [seeMore, setSeeMore] = useState(2);

  useEffect(() => {
    setAddress(addressFromSearchbar);
    if (seeMoreRepu == 0) {
      setSeeMore(undefined);
    }
  }, [addressFromSearchbar]);

  const schema = reputationSchemaUID;
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
    <div className="bigCard h-full w-full text-white">
      <h1 className="text-2xl">Reputations</h1>
      {loading ? (
        <div className="space-y-2">
          <SkeletonTextModal />
          <SkeletonTextModal />
          <SkeletonTextModal />
        </div>
      ) : (
        <div className="flex flex-col">
          {eas.attestations.slice(0, seeMore).map((item, index) => {
            return <SingleReputationCard key={index} item={item} />;
          })}
          {eas.attestations.length === 0 && (
            <div>There are no any Reputation yet.</div>
          )}
        </div>
      )}
      {eas?.attestations.length > seeMore && (
        <>
          <Link href="/Profile?page=Reputations" className="underline">
            More Reputation
          </Link>
        </>
      )}
    </div>
  );
};
