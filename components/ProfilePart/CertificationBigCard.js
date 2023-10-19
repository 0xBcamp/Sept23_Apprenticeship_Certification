import { useState } from "react";
import { Card } from "web3uikit";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { SkeletonTextModal, ErrorPage } from "@/components/Commons";
import SingleCard from "./SingleCard";
const seeMore = 3;
export default () => {
  const GET_QUERY = gql`
    {
      attestations(
        where: {
          schemaId: {
            equals: "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f"
          }
          # schemaId: {
          #   equals: "0x3fa53dac3a50eff2ae5f34f8c0b8366932db5bdd320cfe202592911da121266e"
          # }
          recipient: { equals: "0x6A5951dA6E9F0871e7Fa4D4EE785db0B3489eBb6" }
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
  if (error) return <ErrorPage CardName="Certifications" />;

  return (
    <Card style={{ height: "100%" }}>
      <h1 className="text-2xl">Certifications</h1>
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
          {eas.attestations?.length === 0 && (
            <div>There are no any certificates.</div>
          )}
          {eas.attestations?.length > seeMore && (
            <Link href="/Home/AllCert" className="underline">
              More Certificates
            </Link>
          )}
        </div>
      )}
    </Card>
  );
};
