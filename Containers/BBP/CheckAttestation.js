import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
const CheckAttestation = () => {
  return (
    <main className="h-screen flex flex-col justify-center mx-14 items-center">
      <div className="grid grid-cols-2 items-center">
        <div className="py-32 px-4 space-y-2 text-white">
          <Fade bottom duration={2000}>
            <h3 className="text-3xl font-bold">Check Attestation</h3>
            <p className="text-xl">
              Check who attested to you and whom you have attested
            </p>
            <Button className="w-72 mt-4 button" href="/Profile">
              <p className="text-indigo-400">Check Attestation</p>
            </Button>
          </Fade>
        </div>
        <div style={{ width: "75%" }}>
          <Fade bottom duration={2000}>
            <img src="/images/ransomware.png" alt="" />
          </Fade>
        </div>
      </div>
    </main>
  );
};
export default CheckAttestation;
