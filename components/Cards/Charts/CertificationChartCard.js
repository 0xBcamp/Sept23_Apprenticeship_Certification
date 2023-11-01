import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { useQuery } from "@apollo/client";
import { SkeletonImageModal, ErrorPage } from "/components/Commons";
import { useContext } from "react";
import { ContractContext } from "/Constants/Context/ContractContext";
import { useAccount } from "wagmi";

ChartJS.register(ArcElement, Tooltip, Legend);
export default ({ address }) => {
  // const { address } = useAccount();
  const { GET_ATTESTER_REPUTATION_QUERY, GET_RECIPIENT_REPUTATION_QUERY } =
    useContext(ContractContext);
  const schema =
    "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";
  const by = "id";

  const attesterCount = useQuery(GET_ATTESTER_REPUTATION_QUERY, {
    variables: {
      by: by,
      account: address,
      schema: schema,
    },
  });

  const attester = attesterCount.data?.groupByAttestation.length;

  const recipientCount = useQuery(GET_RECIPIENT_REPUTATION_QUERY, {
    variables: {
      by: by,
      account: address,
      schema: schema,
    },
  });

  const recipient = recipientCount.data?.groupByAttestation.length;
  if (attesterCount.error) return <ErrorPage />;
  const data = {
    labels: ["Me", "Others"],
    datasets: [
      {
        // label: "# of Votes",
        data: [attester, recipient],
        backgroundColor: ["rgb(255, 0,255)", "rgb(54, 162, 235)"],
        // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 0,
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
          {recipient === 0 && attester === 0 && <p>There is no data</p>}
          <p>
            <b>Reuptation Attestation</b>
          </p>
        </div>
      )}
    </>
  );
};
