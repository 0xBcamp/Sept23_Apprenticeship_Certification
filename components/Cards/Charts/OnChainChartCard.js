import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { useQuery } from "@apollo/client";
import { SkeletonImageModal, ErrorPage } from "/components/Commons";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "/Constants/Context/ContractContext";

ChartJS.register(ArcElement, Tooltip, Legend);
export default () => {
  const { GET_ATTESTER_QUERY, GET_RECIPIENT_QUERY, addressFromSearchbar } =
    useContext(ContractContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(addressFromSearchbar);
  }, [addressFromSearchbar]);

  const by = "id";

  const attesterCount = useQuery(GET_ATTESTER_QUERY, {
    variables: {
      by: by,
      account: address,
      // schema: schema,
    },
  });

  const attester = attesterCount.data?.groupByAttestation.length;

  const recipientCount = useQuery(GET_RECIPIENT_QUERY, {
    variables: {
      by: by,
      account: address,
      // schema: schema,
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
        backgroundColor: ["rgb(239, 157, 0)", "rgb(16, 98, 255)"],
        // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <>
      {attesterCount.loading && recipientCount.loading ? (
        <SkeletonImageModal />
      ) : (
        <div
          className="flex flex-col justify-center items-center"
          style={{ width: "22%" }}
        >
          <Pie data={data} />
          <p>
            {recipient === 0 && attester === 0 && <p>There is no data</p>}

            <b>OnChain Attestation</b>
          </p>
        </div>
      )}
    </>
  );
};
