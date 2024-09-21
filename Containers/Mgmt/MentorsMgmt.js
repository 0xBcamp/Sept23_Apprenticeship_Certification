import { Button } from "@mui/material";
import GreetingLottie from "../../components/DisplayLottie";
import { Fade } from "react-awesome-reveal";
export default () => {
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="flex items-center ">
        <div>
          <Fade direction="down" duration={2000}>
            <GreetingLottie animationPath="/lottie/AttestingGreen.json" />
          </Fade>
        </div>
        <div className="px-4 text-white">
          <Fade direction="down" duration={2000}>
            <p className="text-3xl font-bold">Manage the Mentor Members</p>
            <p className="text-xl">Manage the Mentors Members</p>

            <Button href="/Home/MentorsManagement" className="w-72 mt-4 button">
              <p className="font-semibold text-black">Manage Now</p>
            </Button>
          </Fade>
        </div>
      </div>
    </main>
  );
};
