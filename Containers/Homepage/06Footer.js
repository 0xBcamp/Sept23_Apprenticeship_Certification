import GreetingLottie from "@/components/DisplayLottie";
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
      <Link href="/BBP" className="Primary__Click w-auto">
        So let's Get Started
      </Link>
      <section className="section section-lg section-shaped ">
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="p-4 ">
            <Fade direction="bottom" duration={2000}>
              <p className="text-5xl font-bold">Footer</p>
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
    </main>
  );
};
export default Section4;
