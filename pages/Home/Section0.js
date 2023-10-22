import GreetingLottie from "@/components/DisplayLottie";
import { useEffect } from "react";
import { Fade } from "react-reveal";
const Section1 = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });
  return (
    <main className="flex flex-col justify-center mx-12 text-7xl font-bold items-center text-white">
      <p className="text-8xl font-bold ">BlockBadge</p>
      <p className="text-blue-200">Proof of Excellence, Verified Securely</p>
    </main>
  );
};
export default Section1;
