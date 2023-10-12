<<<<<<< HEAD
import { useState } from "react";
import { Card } from "web3uikit";
import OverallCard from "./OverallCard";
import { useQuery, gql } from "@apollo/client";
import SkeletonImageModal from "@/components/Commons/SkeletonImageModal";
import ErrorPage from "@/components/Commons/ErrorPage";
import { useMoralis } from "react-moralis";

export default () => {
  // const { account } = useMoralis();
  const GET_ATTESTER_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
    ) {
      groupByAttestation(by: $by, where: { attester: { equals: $account } }) {
        id
      }
    }
  `;

  const GET_RECIPIENT_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
    ) {
      groupByAttestation(by: $by, where: { recipient: { equals: $account } }) {
        id
      }
    }
  `;

  const account = "0x728e124340b2807eD0cc5B2104eD5c07cceFa0Ec";
  const by = "id";

  const attesterCount = useQuery(GET_ATTESTER_QUERY, {
    variables: {
      by: by,
      account: account,
    },
  });

  // console.log(attesterCount.data?.groupByAttestation.length);
  const attester = attesterCount.data?.groupByAttestation.length;

  const recipientCount = useQuery(GET_RECIPIENT_QUERY, {
    variables: {
      by: by,
      account: account,
    },
  });

  const recipient = recipientCount.data?.groupByAttestation.length;
  // console.log(recipient);

  if (attesterCount.error) return <ErrorPage CardName="Overall" />;

  return (
    <Card style={{ height: "20%" }}>
      <h1 className="text-2xl">Overall</h1>
      {attesterCount.loading && recipientCount.loading ? (
        <div className="flex justify-around items-center">
          <SkeletonImageModal />
          <SkeletonImageModal />
          <SkeletonImageModal />
        </div>
      ) : (
        <div className="flex justify-around items-center">
          <OverallCard attester={attester} recipient={recipient} />
          <OverallCard attester={attester} recipient={recipient} />
          <OverallCard attester={attester} recipient={recipient} />
        </div>
      )}
    </Card>
  );
};
=======
import { useState } from "react";
import { Card } from "web3uikit";
import OverallCard from "./OverallCard";
import { useQuery, gql } from "@apollo/client";
import SkeletonImageModal from "@/components/Commons/SkeletonImageModal";
import ErrorPage from "@/components/Commons/ErrorPage";
import { useMoralis } from "react-moralis";

export default () => {
  // const { account } = useMoralis();
  const GET_ATTESTER_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
    ) {
      groupByAttestation(by: $by, where: { attester: { equals: $account } }) {
        id
      }
    }
  `;

  const GET_RECIPIENT_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
    ) {
      groupByAttestation(by: $by, where: { recipient: { equals: $account } }) {
        id
      }
    }
  `;

  const account = "0x728e124340b2807eD0cc5B2104eD5c07cceFa0Ec";
  const by = "id";

  const attesterCount = useQuery(GET_ATTESTER_QUERY, {
    variables: {
      by: by,
      account: account,
    },
  });

  // console.log(attesterCount.data?.groupByAttestation.length);
  const attester = attesterCount.data?.groupByAttestation.length;

  const recipientCount = useQuery(GET_RECIPIENT_QUERY, {
    variables: {
      by: by,
      account: account,
    },
  });

  const recipient = recipientCount.data?.groupByAttestation.length;
  // console.log(recipient);

  if (attesterCount.error) return <ErrorPage CardName="Overall" />;

  return (
    <Card style={{ height: "20%" }}>
      <h1 className="text-2xl">Overall</h1>
      {attesterCount.loading && recipientCount.loading ? (
        <div className="flex justify-around items-center">
          <SkeletonImageModal />
          <SkeletonImageModal />
          <SkeletonImageModal />
        </div>
      ) : (
        <div className="flex justify-around items-center">
          <OverallCard attester={attester} recipient={recipient} />
          <OverallCard attester={attester} recipient={recipient} />
          <OverallCard attester={attester} recipient={recipient} />
        </div>
      )}
    </Card>
  );
};
>>>>>>> origin/alfaqi
