import dynamic from "next/dynamic";

const MakeAttest = dynamic(() => import("../../Containers/Home/MakeAttest"));
const CheckAttestation = dynamic(() =>
  import("../../Containers/Home/CheckAttestation")
);

export default () => {
  return (
    <div className="container mx-auto">
      <MakeAttest />
      <hr />
      <CheckAttestation />
      <hr />
    </div>
  );
};
