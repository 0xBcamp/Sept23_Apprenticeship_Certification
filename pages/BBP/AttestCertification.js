import Link from "next/link";
import AttestCertificationCard from "@/components/Cards/AttestCertificationCard";
import GreetingLottie from "@/components/DisplayLottie";
export default () => {
  return (
    <>
      <Link href={"/BBP/Attestations"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col gap-3 justify-center items-center">
        <div className="grid grid-cols-2">
          <div>
            <AttestCertificationCard />
          </div>
          <div
            className="flex flex-col grid-cols-1 items-center"
            style={{ width: "70%" }}
          >
            <GreetingLottie animationPath="/lottie/AddDocument.json" />
          </div>
        </div>
      </main>
    </>
  );
};
