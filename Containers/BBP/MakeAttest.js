import GreetingLottie from "@/components/DisplayLottie";
import Link from "next/link";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
const MakeAttest = () => {
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="grid grid-cols-2 ">
        <div>
          <Fade bottom duration={2000}>
            <GreetingLottie animationPath="/lottie/AddDocument.json" />
          </Fade>
        </div>
        <div className="py-32 px-4 ">
          <Fade bottom duration={2000}>
            <p className="text-3xl font-bold">Make Attestation</p>
            <p className="text-xl">Attest your friends</p>
            <Link href="/BBP/Attestations" className="Primary__Click ">
              Attest Now
            </Link>
          </Fade>
        </div>
      </div>
    </main>
  );
};
export default MakeAttest;
