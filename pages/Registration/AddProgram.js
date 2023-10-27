import Link from "next/link";
import { TypeWriterOnce } from "@/components/Commons";
import AddProgramCard from "@/components/Cards/AddProgramCard";
export default () => {
  return (
    <>
      <Link href={"/Home/Attestations"} className="Link__Back">
        Back
      </Link>
      <main className="flex flex-col gap-2 items-center p-12 ">
        <AddProgramCard />
      </main>
    </>
  );
};
