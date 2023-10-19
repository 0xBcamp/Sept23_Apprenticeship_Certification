import Link from "next/link";
import { TypeWriterOnce } from "@/components/Commons";
import BlockSurveyCard from "@/components/Cards/BlockSurveyCard";
export default () => {
  return (
    <>
      <Link href={"/Registration"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col gap-2 items-center p-12 ">
        {/* <main> */}
        {/* <h2 className="flex items-center justify-center gap-2">
          <EASImage name={"Logo"} imageSrc={IMG} ImgWidth={200} />
        </h2>
        */}
        <h1 className="text-xl font-bold">
          <TypeWriterOnce text="BlockSurvey" />
        </h1>
        <BlockSurveyCard />
      </main>
    </>
  );
};
