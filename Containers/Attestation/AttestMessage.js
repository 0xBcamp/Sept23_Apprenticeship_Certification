import GreetingLottie from "@/components/DisplayLottie";
import { Button } from "@mui/material";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
const CheckAttestation = () => {
  return (
    <main className="h-full flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="grid grid-cols-2 ">
        <div>
          <Fade bottom duration={2000}>
            <GreetingLottie animationPath="/lottie/Attesting.json" />
          </Fade>
        </div>
        <div className="px-4 text-white">
          <Fade bottom duration={2000}>
            <p className="text-3xl font-bold">Attest Reputation (feedback)</p>
            <p className="text-xl">
              What is your evaluation of this apprentice?
            </p>
            <Button href="/Home/AttestMessage" className=" mt-4 button">
              <p className="text-indigo-400">Attest Now</p>
            </Button>
          </Fade>
        </div>
      </div>
    </main>
  );
};
export default CheckAttestation;
