import GreetingLottie from "../../components/DisplayLottie";
import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
const CheckAttestation = () => {
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="flex items-center ">
        <div className="px-4 text-white">
          <Fade direction="down" duration={2000}>
            <p className="text-3xl font-bold">Manage the BNS</p>
            <p className="text-xl">Manage your BNS</p>

            <Button href="/Home/BNSManagement" className="mt-4 w-72 button">
              <p className="text-indigo-400">Manage it</p>
            </Button>
          </Fade>
        </div>
        {/* <div>
          <Fade direction="down" duration={2000}>
            <GreetingLottie animationPath="/lottie/AttestingGreen.json" />
          </Fade>
        </div> */}
      </div>
    </main>
  );
};
export default CheckAttestation;
