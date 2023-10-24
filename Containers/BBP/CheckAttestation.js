import GreetingLottie from "@/components/DisplayLottie";
import Link from "next/link";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
const CheckAttestation = () => {
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="grid grid-cols-2 ">
        <div className="py-32 px-4  text-white">
          <Fade bottom duration={2000}>
            <p className="text-3xl font-bold">Check Attestation</p>
            <p className="text-xl">
              Check who attested to you and whom you have attested
            </p>
            <Link href="/Home" className="Primary__Click ">
              Check Attestation
            </Link>
          </Fade>
        </div>
        <div>
          <Fade bottom duration={2000}>
            <GreetingLottie animationPath="/lottie/Verifing2.json" />
          </Fade>
        </div>
      </div>
    </main>
  );
};
export default CheckAttestation;
