import dynamic from "next/dynamic";

const MakeAttest = dynamic(() =>
  import("../../Containers/Homepage/MakeAttest")
);
const CheckAttestation = dynamic(() =>
  import("../../Containers/Homepage/CheckAttestation")
);

export default () => {
  return (
    <div className="container mx-auto h-full">
      <MakeAttest />
      <CheckAttestation />
    </div>
  );
};
