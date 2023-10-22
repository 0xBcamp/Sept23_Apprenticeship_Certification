import GreetingLottie from "@/components/DisplayLottie";
import { useEffect } from "react";
import { Fade } from "react-reveal";
const Section1 = () => {
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
                <p className="text-5xl font-bold">What</p>
                <ul>
                  <p>
                    BlockBadge is an all-in-one recruiting solution for
                    candidates that includes:
                  </p>
                  <li>Credential Verification</li>
                  <li>Background Checks</li>
                  <li>Developer Reputation</li>
                </ul>
              </Fade>
            </div>
            <div className="p-4">
              <Fade right duration={2000}>
                {/* <img src="/images/images.png" /> */}
                <GreetingLottie animationPath="/lottie/coding.json" />
              </Fade>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Section1;
