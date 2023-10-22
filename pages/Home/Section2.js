import GreetingLottie from "@/components/DisplayLottie";
import { useEffect } from "react";
import { Fade } from "react-reveal";
const Section2 = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });
  return (
    <main>
      <div className="position-relative">
        <section className="section section-lg section-shaped pb-250">
          <div className="grid grid-cols-2 gap-2 p-4">
            <div className="p-4 text-white">
              <Fade left duration={2000}>
                <p className="text-5xl font-bold">Why</p>
                <p>
                  The tech recruiting system is broken, non-transparent, and
                  inefficient, especially when it comes to verifying skills and
                  conducting background checks.
                </p>
              </Fade>
            </div>
            <div className="p-4">
              <Fade right duration={2000}>
                {/* <img src="/images/images.png" /> */}
                <GreetingLottie animationPath="/lottie/build.json" />
              </Fade>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Section2;
