import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
export default () => {
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="flex items-center ">
        <div className="px-4 text-white">
          <Fade direction="down" duration={2000}>
            <p className="text-3xl font-bold">Manage the Mentor Members</p>
            <p className="text-xl">Manage the Mentors Members</p>

            <Button href="/Home/MentorsManagement" className="mt-4 w-72 button">
              <p className="text-indigo-400">Manage Now</p>
            </Button>
          </Fade>
        </div>
      </div>
    </main>
  );
};
