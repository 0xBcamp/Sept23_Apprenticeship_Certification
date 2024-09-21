import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
export default () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-between">
        <div className="px-4 space-y-2 text-white">
          <Fade duration={2000}>
            <h3 className="text-3xl font-bold">Check Attestation</h3>
            <p className="text-xl">
              Check who attested to you and whom you have attested
            </p>
            <Button className="w-72 mt-4 button" href="/Profile">
              <p className="font-semibold text-black">Check Attestation</p>
            </Button>
          </Fade>
        </div>
        <div style={{ width: "75%" }}>
          <Fade duration={2000}>
            <img src="/images/ransomware.png" alt="" />
          </Fade>
        </div>
      </div>
    </main>
  );
};
