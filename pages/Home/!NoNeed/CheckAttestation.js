import { EASImage } from "@/components/Commons";
import CheckAttestationCard from "@/components/!NoNeed/CheckAttestationCard";
import Link from "next/link";
const IMG = "/logo.png";
export default () => {
  return (
    <>
      <Link href={"/Home"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col items-center p-12 ">
        <h2 className="flex items-center justify-center gap-2">
          <EASImage name={"Logo"} imageSrc={IMG} ImgWidth={200} />
        </h2>

        <span className="mt-3 font-bold">
          Proof of Excellence, Verified Securely
        </span>
        <CheckAttestationCard />
      </main>
    </>
  );
};
