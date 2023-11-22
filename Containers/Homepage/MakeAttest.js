import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
export default () => {
  return (
    <main className="flex flex-col gap-3 justify-betweenitems-center">
      <div className="w-full flex items-center justify-between">
        <div style={{ width: "90%" }}>
          <Fade bottom duration={2000}>
            <img src="/images/Immutable Authenticity.png" alt="" />
          </Fade>
        </div>
        <div className="px-4">
          <Fade bottom duration={2000}>
            <h3 className=" font-bold">Make Attestation</h3>
            <p className="text-xl">Attest your friends</p>
            <Button
              className="w-72 mt-4 button font-semibold text-black"
              href="/Home/Attestations"
            >
              <p className="font-semibold text-black">Attest Now</p>
            </Button>
          </Fade>
        </div>
      </div>
    </main>
  );
};
