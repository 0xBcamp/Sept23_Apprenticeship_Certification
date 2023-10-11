import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export default ({ attester, recipient }) => {
  // console.log(attester);
  const data = {
    labels: ["Attested", "Attested Me"],
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
  // if (attester || recipient == 0) return <p>No Data</p>;
  return (
    <div
      className="flex flex-col justify-center items-center "
      style={{ width: "22%" }}
    >
      <Pie data={data} />
      <p>
        <b>Onchain Attestation</b>
      </p>
    </div>
  );
};
