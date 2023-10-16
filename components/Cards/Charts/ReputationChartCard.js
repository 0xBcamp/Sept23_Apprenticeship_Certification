import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { useQuery, gql } from "@apollo/client";
import { SkeletonImageModal, ErrorPage } from "@/components/Commons";

ChartJS.register(ArcElement, Tooltip, Legend);
export default () => {
  // const { account } = useMoralis();
  const GET_ATTESTER_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
      $schema: String
    ) {
      groupByAttestation(
        by: $by
        where: {
          attester: { equals: $account }
          schema: { is: { id: { equals: $schema } } }
        }
      ) {
        id
      }
    }
  `;

  const GET_RECIPIENT_QUERY = gql`
    query GroupByAttestation(
      $by: [AttestationScalarFieldEnum!]!
      $account: String
      $schema: String
    ) {
      groupByAttestation(
        by: $by
        where: {
          recipient: { equals: $account }
          schema: { is: { id: { equals: $schema } } }
        }
      ) {
        id
      }
    }
  `;

  const account = "0x728e124340b2807eD0cc5B2104eD5c07cceFa0Ec";
  const schema =
    "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";
  const by = "id";

  const attesterCount = useQuery(GET_ATTESTER_QUERY, {
    variables: {
      by: by,
      account: account,
      schema: schema,
    },
  });

  // console.log(attesterCount.data?.groupByAttestation.length);
  const attester = attesterCount.data?.groupByAttestation.length;

  const recipientCount = useQuery(GET_RECIPIENT_QUERY, {
    variables: {
      by: by,
      account: account,
      schema: schema,
    },
  });

  const recipient = recipientCount.data?.groupByAttestation.length;
  // console.log(recipient);

  if (attesterCount.error) return <ErrorPage CardName="Overall" />;
  const data = {
    labels: ["Me", "Others"],
    datasets: [
      {
        // label: "# of Votes",
        data: [attester, recipient],
        backgroundColor: ["rgb(255, 0,255)", "rgb(54, 162, 235)"],
        // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        // borderWidth: 10,
      },
    ],
  };
  return (
    <>
      {attesterCount.loading && recipientCount.loading ? (
        <div>
          <SkeletonImageModal />
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center "
          style={{ width: "22%" }}
        >
          <Pie data={data} />
          <p>
            <b>Reuptation Attestation</b>
          </p>
        </div>
      )}
    </>
  );
};

// console.log(attester);

// if (attester || recipient == 0) return <p>No Data</p>;
