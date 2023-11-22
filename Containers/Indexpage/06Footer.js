import { Facebook, GitHub, LinkedIn, Telegram } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
const Section4 = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center ">
      <div className="flex">
        <Link
          href="/Home"
          className="Primary__Click w-80 p-3 m-3 text-xl text-center hover:text-black"
        >
          So let's Get Started
        </Link>
        {/* <Button href="/Registration" className="w-72 p-2 mt-4 button">
          <p className="text-xl text-indigo-400"> Register Now</p>
        </Button> */}
      </div>
      <section className="section section-lg section-shaped ">
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="p-4 ">
            <Fade direction="bottom" duration={2000}>
              <h3 className="text-5xl font-bold">Blockbadge Team</h3>
              <h3 className="text-3xl">Meet the team</h3>
              <div className="flex-col">
                <div className="flex gap-2">
                  <div>Harold </div>
                  <GitHub />
                  <LinkedIn />
                  <Telegram />
                </div>
                <div className="flex gap-2">
                  <div>Manraj </div>
                  <GitHub />
                  <LinkedIn />
                  <Telegram />
                </div>
                <div className="flex gap-2">
                  <div>Theresa </div>
                  <GitHub />
                  <LinkedIn />
                  <Telegram />
                </div>
                <div className="flex gap-2">
                  <div>Ali Raza </div>
                  <GitHub />
                  <LinkedIn />
                  <Telegram />
                </div>
                <div className="flex gap-2">
                  <div>Alfaqi </div>
                  <GitHub />
                  <LinkedIn />
                  <Telegram />
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Section4;
