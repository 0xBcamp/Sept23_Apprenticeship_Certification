import Link from "next/link";
import { TypeWriterOnce } from "@/components/Commons";
import OffchainAttestationCard from "@/components/Cards/OffchainAttestationCard";
export default () => {
  return (
    <>
      <Link href={"/Home/Attestations"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col gap-2 items-center p-12 ">
        {/* <main> */}
        {/* <h2 className="flex items-center justify-center gap-2">
          <EASImage name={"Logo"} imageSrc={IMG} ImgWidth={200} />
        </h2>
        */}
        <h1 className="text-xl font-bold">
          <TypeWriterOnce text="Offchain Attestation" />
        </h1>
        <OffchainAttestationCard />
      </main>
    </>
  );
};
