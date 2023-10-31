import Link from "next/link";
import GreetingLottie from "/components/DisplayLottie";
import MentorsManagement from "../../components/Cards/MentorsManagementCard";
export default () => {
  return (
    <div className="w-[60vw] mx-auto">
      <Link href={"/Home/Attestations"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col gap-3 justify-center items-center">
        <div className="grid grid-cols-2">
          <div>
            <MentorsManagement />
          </div>
          {/* <div className="flex flex-col grid-cols-1 items-center">
            <GreetingLottie animationPath="/lottie/Attestation.json" />
          </div> */}
        </div>
      </main>
    </div>
  );
};
