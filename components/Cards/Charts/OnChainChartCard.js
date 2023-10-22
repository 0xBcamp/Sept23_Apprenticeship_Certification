import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { useQuery } from "@apollo/client";
import { SkeletonImageModal, ErrorPage } from "@/components/Commons";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "@/Context/ContractContext";

ChartJS.register(ArcElement, Tooltip, Legend);
export default () => {
  const [accountAddress, setAccountAddress] = useState("");
  const { GET_ATTESTER_QUERY, GET_RECIPIENT_QUERY, getMyAddress } =
    useContext(ContractContext);
  useEffect(() => {
    const func = async () => {
      setAccountAddress(await getMyAddress());
    };
    func();
  }, []);

  // const account = accountAddress
  //   ? accountAddress
  //   : "0x6A5951dA6E9F0871e7Fa4D4EE785db0B3489eBb6";
  const schema =
    "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";
  const by = "id";

  const attesterCount = useQuery(GET_ATTESTER_QUERY, {
    variables: {
      by: by,
      account: accountAddress,
      // schema: schema,
    },
  });

  const attester = attesterCount.data?.groupByAttestation.length;

  const recipientCount = useQuery(GET_RECIPIENT_QUERY, {
    variables: {
      by: by,
      account: accountAddress,
      // schema: schema,
    },
  });

  const recipient = recipientCount.data?.groupByAttestation.length;

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
        <SkeletonImageModal />
      ) : (
        <div
          className="flex flex-col justify-center items-center "
          style={{ width: "22%" }}
        >
          <Pie data={data} />
          <p>
            {recipient === 0 && <p>There is no data</p>}

            <b>OnChain Attestation</b>
          </p>
        </div>
      )}
    </>
  );
};
