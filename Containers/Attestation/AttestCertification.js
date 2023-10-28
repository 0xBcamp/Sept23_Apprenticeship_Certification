import GreetingLottie from "@/components/DisplayLottie";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
const CheckAttestation = () => {
  return (
    <main className="flex flex-col gap-3 justify-center mx-14 items-center">
      <div className="grid grid-cols-2 ">
        <div className="px-4 text-white">
          <Fade bottom duration={2000}>
            <p className="text-3xl font-bold">
              Add a Certification <sub className="text-sm">(Only Mentors)</sub>
            </p>
            <p className="text-xl">Attest new Apprentice</p>
            <Link href="/Home/AttestCertification" className="Primary__Click ">
              Add Now
            </Link>
          </Fade>
        </div>
        <div>
          <Fade bottom duration={2000}>
            <GreetingLottie animationPath="/lottie/AttestingGreen.json" />
          </Fade>
        </div>
      </div>
    </main>
  );
};
export default CheckAttestation;
