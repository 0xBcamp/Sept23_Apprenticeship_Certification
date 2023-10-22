import Link from "next/link";
import AttestCertificationCard from "@/components/Cards/AttestCertificationCard";
import { TypeWriterOnce } from "@/components/Commons";
export default () => {
  return (
    <>
      <Link href={"/BBP/Attestations"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col gap-2 items-center p-12 ">
        {/* <main> */}
        {/* <h2 className="flex items-center justify-center gap-2">
          <EASImage name={"Logo"} imageSrc={IMG} ImgWidth={200} />
        </h2>
        */}
        <h1 className="text-xl font-bold">
          <TypeWriterOnce text="Attest a Certificate" />
        </h1>
        <AttestCertificationCard />
      </main>
    </>
  );
};
