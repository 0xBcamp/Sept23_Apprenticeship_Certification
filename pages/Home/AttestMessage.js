import AttestMessageCard from "@/components/Cards/AttestMessageCard";
import Link from "next/link";
import { TypeWriterOnce } from "@/components/Commons";
export default () => {
  return (
    <>
      <Link href={"/Home/Attestations"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col gap-2 items-center p-12 ">
        {/* <h2 className="flex items-center justify-center gap-2">
          <EASImage name={"Logo"} imageSrc={IMG} ImgWidth={200} />
        </h2>
        <span className="mt-3 font-bold">
          Proof of Excellence, Verified Securely
        </span> */}
        <h1 className="text-xl font-bold">
          <TypeWriterOnce text="What's your feedback" />
        </h1>
        <AttestMessageCard />
      </main>
    </>
  );
};
