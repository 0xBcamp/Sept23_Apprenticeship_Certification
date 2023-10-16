import { EASImage, TypeWriterOnce } from "@/components/Commons";
import Link from "next/link";
const IMG = "/logo.png";

export default ({ back, next }) => {
  const speed = "10";

  return (
    <nav className=" head p-5 border-b-2 flex flex-row justify-between items-center">
      <h1>
        <Link href={"/ppt"}>
          <EASImage name={"Logo"} imageSrc={IMG} ImgWidth={"300"} />
        </Link>
      </h1>
      {/* <header className="text-6xl font-bold ">
        {back == 0 ? (
          <TypeWriterOnce text="BlockBadge Platform" speed={speed} />
        ) : (
          <p>BlockBadge Platform</p>
        )}
      </header> */}

      <div className="flex font-bold flex-row items-center space-x-4">
        {back != 0 && (
          <Link className="mr-4 p-6" href={"/ppt/0" + back}>
            Back
          </Link>
        )}
        {next != 0 && (
          <Link className="mr-4 p-6" href={"/ppt/0" + next}>
            Next
          </Link>
        )}
      </div>
    </nav>
  );
};
