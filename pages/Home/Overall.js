import { Card } from "web3uikit";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import {
  SkeletonImageModal,
  ErrorPage,
  TypeWriterOnce,
} from "@/components/Commons";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMoralis } from "react-moralis";
import OverallBigCard from "@/components/ProfilePart/OverallBigCard";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const account = "0x6A5951dA6E9F0871e7Fa4D4EE785db0B3489eBb6";
  const by = "id";

  const attesterCount = useQuery(GET_ATTESTER_QUERY, {
    variables: {
      by: by,
      account: account,
    },
  });

  console.log(attesterCount.data?.groupByAttestation.length);
  const a = attesterCount.data?.groupByAttestation.length;
  const recipientCount = useQuery(GET_RECIPIENT_QUERY, {
    variables: {
      by: by,
      account: account,
    },
  });

  const b = recipientCount.data?.groupByAttestation.length;
  console.log(b);
  if (attesterCount.error) return <ErrorPage CardName="Overall" />;

  const data = {
    labels: ["Attested", "Attested Me"],
    datasets: [
      {
        // label: "# of Votes",
        data: [a, b],
        backgroundColor: ["rgb(255, 0,255)", "rgb(54, 162, 235)"],
        // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        // borderWidth: 10,
      },
    ],
  };

  return (
    <>
      <Link href={"/Profile"} className="Link__Back">
        Back
      </Link>
      <h1 className="text-xl font-bold">
        <TypeWriterOnce text="Overall" />
      </h1>
      <OverallBigCard account={account} />
    </>
  );
};
