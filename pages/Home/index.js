import dynamic from "next/dynamic";

const MakeAttest = dynamic(() =>
  import("../../Containers/Homepage/MakeAttest")
);
const CheckAttestation = dynamic(() =>
  import("../../Containers/Homepage/CheckAttestation")
);

export default () => {
  return (
    <div className="h-screen w-[40vw] flex flex-col gap-24 mx-auto">
      <MakeAttest />
      <CheckAttestation />
    </div>
  );
};
