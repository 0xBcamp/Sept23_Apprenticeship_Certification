import GreetingLottie from "@/components/DisplayLottie";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
const Section4 = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });
  return (
    <main>
      <div className="position-relative">
        <section className="section section-lg section-shaped pb-250">
          <div className="grid grid-cols-2 gap-2 p-4">
            <div className="p-4">
              <Fade direction="left" duration={2000}>
                {/* <img src="/images/images.png" /> */}
                <GreetingLottie animationPath="/lottie/Animation2.json" />
              </Fade>
            </div>
            <div className="p-4 text-white">
              <Fade direction="right" duration={2000}>
                <p className="text-5xl font-bold">Problems We Solve</p>
                <ul className="text-xl">
                  <p className="text-3xl">Fewer Recruiting Rounds:</p>
                  <li>No Need for ATS (Applicant Tracking Systems)</li>
                  <li>No Need for Referrals</li>
                  <li>No Need for Third Parties</li>
                </ul>
              </Fade>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Section4;
