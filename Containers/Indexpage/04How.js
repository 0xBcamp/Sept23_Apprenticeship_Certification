import DisplayLottie from "/components/DisplayLottie";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
const Section3 = () => {
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
                <h1 className="text-5xl font-bold">How</h1>
                <h3 className="text-3xl">
                  We address these issues by providing transparency, security,
                  and confidence in candidate data through Blockchain-based
                  Attestation, utilizing Ethereum Attestation Service.
                </h3>
              </Fade>
            </div>
            <div className="p-4">
              <Fade direction="right" duration={2000}>
                {/* <img src="/images/images.png" /> */}
                <DisplayLottie animationPath="/lottie/coding.json" />
              </Fade>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Section3;
