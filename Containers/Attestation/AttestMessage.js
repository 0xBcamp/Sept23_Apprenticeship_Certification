import GreetingLottie from "../../components/DisplayLottie";
import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
export default () => {
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="flex items-center ">
        <div className="px-4 text-white">
          <Fade direction="up" duration={2000}>
            <p className="text-3xl font-bold">Attest Who You Know</p>
            <p className="text-xl">
              What is your evaluation of this apprentice?
            </p>
            <Button href="/Home/AttestMessage" className="w-72 mt-4 button">
              <p className="font-semibold text-black">Attest Now</p>
            </Button>
          </Fade>
        </div>
        <div>
          <Fade direction="up" duration={2000}>
            <GreetingLottie animationPath="/lottie/Attesting.json" />
          </Fade>
        </div>
      </div>
    </main>
  );
};
