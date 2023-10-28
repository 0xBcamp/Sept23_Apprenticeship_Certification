import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
const MakeAttest = () => {
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="grid grid-cols-2 items-center">
        <div style={{ width: "90%" }}>
          <Fade bottom duration={2000}>
            <img src="/images/Immutable Authenticity.png" alt="" />
          </Fade>
        </div>
        <div className="py-32 px-4">
          <Fade bottom duration={2000}>
            <h3 className=" font-bold">Make Attestation</h3>
            <p className="text-xl">Attest your friends</p>
            <Button className="w-72" href="/Home/Attestations">
              Attest Now
            </Button>
          </Fade>
        </div>
      </div>
    </main>
  );
};
export default MakeAttest;
