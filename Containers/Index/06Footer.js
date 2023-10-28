import { Button } from "@mui/material";
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
        <Button href="/Home" className="w-72 p-2 mt-4 button">
          <p className="text-xl">So let's Get Started</p>
        </Button>
        <Button href="/Registration" className="w-72 p-2 mt-4 button">
          <p className="text-xl"> Register Now</p>
        </Button>
      </div>
      <section className="section section-lg section-shaped ">
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="p-4 ">
            <Fade direction="bottom" duration={2000}>
              <h1 className="text-5xl font-bold">Footer</h1>
              <ul className="text-xl">
                <h3 className="text-3xl">Some text:</h3>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur id finibus risus. Morbi scelerisque magna eget
                  elementum sodales. Praesent scelerisque risus quis ante
                  eleifend mollis. Nam eget metus tempus quam rutrum luctus.
                </li>
              </ul>
            </Fade>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Section4;
