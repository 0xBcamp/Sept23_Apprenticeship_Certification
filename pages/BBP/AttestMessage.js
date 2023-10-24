import AttestMessageCard from "@/components/Cards/AttestMessageCard";
import Link from "next/link";
import { EASImage, TypeWriterOnce } from "@/components/Commons";
import GreetingLottie from "@/components/DisplayLottie";
import { Fade } from "react-reveal";
export default () => {
  return (
    <>
      <Link href={"/BBP/Attestations"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col gap-3 justify-center items-center">
        <section className="section section-lg section-shaped ">
          <div className="grid grid-cols-2">
            <div
              className="flex flex-col grid-cols-1 px-4"
              style={{ width: "80%" }}
            >
              <GreetingLottie animationPath="/lottie/Attesting.json" />
            </div>
            <div>
              <AttestMessageCard />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
