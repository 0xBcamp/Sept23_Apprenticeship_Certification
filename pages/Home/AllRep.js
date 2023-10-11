import { useState } from "react";
import { Card } from "web3uikit";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { SkeletonModal, ErrorPage, TypeWriterOnce } from "@/components/Commons";
import SingleCard from "@/components/ProfilePart/SingleCard";
export default () => {
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
  const [showCertification, setShowCertification] = useState(true);

  const { loading, error, data: eas } = useQuery(GET_QUERY);

  const handleClick = () => {
    setShowCertification(!showCertification);
  };
  if (error) return <ErrorPage CardName="Reputations" />;
  return (
    <>
      <Link href={"/Profile"} className="Link__Back">
        Back
      </Link>
      <h1 className="text-xl font-bold">
        <TypeWriterOnce text="Reputations" />
      </h1>
      <Card>
        {loading ? (
          <div className="space-y-2">
            <SkeletonModal />
            <SkeletonModal />
            <SkeletonModal />
          </div>
        ) : (
          <>
            {eas.attestations.map((item) => {
              return <SingleCard item={item} />;
            })}
          </>
        )}
      </Card>
    </>
  );
};
