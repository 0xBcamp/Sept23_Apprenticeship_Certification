import dynamic from "next/dynamic";

const MakeAttest = dynamic(() => import("../../Containers/BBP/MakeAttest"));
const CheckAttestation = dynamic(() =>
  import("../../Containers/BBP/CheckAttestation")
);

export default () => {
  return (
    <div className="container mx-auto h-full">
      <MakeAttest />
      <CheckAttestation />
    </div>
  );
};
