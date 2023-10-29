import DisplayLottie from "../../components/DisplayLottie";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
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
              <Fade direction="left" duration={2000}>
                <h1 className="text-5xl font-bold">What</h1>
                <ul className="text-xl">
                  <h3 className="text-3xl">
                    BlockBadge is an all-in-one recruiting solution for
                    candidates that includes:
                  </h3>
                  <li>Credential Verification</li>
                  <li>Background Checks</li>
                  <li>Developer Reputation</li>
                </ul>
              </Fade>
            </div>
            <div className="p-4">
              <Fade direction="right" duration={2000}>
                {/* <img src="/images/images.png" /> */}

                <DisplayLottie animationPath="/lottie/Verifing2.json" />
              </Fade>
            </div>
          </div>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Section1;
