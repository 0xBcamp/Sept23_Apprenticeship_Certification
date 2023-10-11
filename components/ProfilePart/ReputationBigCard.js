import { useEffect, useState } from "react";
import { Card } from "web3uikit";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { SkeletonTextModal, ErrorPage } from "@/components/Commons";
import SingleCard from "./SingleCard";
const seeMore = 3;
const GET_QUERY = gql`
  # query Attestations($account: String!) {
  {
    attestations(
      where: {
        schemaId: {
          equals: "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f"
        }
        recipient: { equals: "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe" }
      }
    ) {
      id
      recipient
      decodedDataJson
      attester
      time
      timeCreated
    }
  }
`;
export default () => {
  const account = "0x728e124340b2807eD0cc5B2104eD5c07cceFa0Ec";
  const [showAttestations, setShowAttestations] = useState(true);
  const { loading, error, data: eas } = useQuery(GET_QUERY);

  const handleAttestationClick = () => {
    console.log(eas);
    setShowAttestations(!showAttestations);
  };
  useEffect(() => {}, [account]);
  if (error) return <ErrorPage CardName="Reputations" />;
  return (
    <Card style={{ height: "100%" }}>
      <h1 className="text-2xl">Reputations</h1>
      {loading ? (
        <div className="space-y-2">
          <SkeletonTextModal />
          <SkeletonTextModal />
          <SkeletonTextModal />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {eas.attestations.slice(0, seeMore).map((item, index) => {
            return <SingleCard key={index} item={item} />;
          })}
          {eas.attestations.length === 0 && (
            <div>There are no any feekback.</div>
          )}
          {eas.attestations.length > seeMore && (
            <Link href="/Home/AllRep" className="underline">
              More feekbacks
            </Link>
          )}
        </div>
      )}
    </Card>
  );
};
