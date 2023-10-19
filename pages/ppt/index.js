import { EASImage, TypeWriterOnce } from "@/components/Commons";
import NavBar from "./NavBar";
import { useState } from "react";
const IMG = "/logo.png";

export default () => {
  const [nextLine, setNextLine] = useState(0);

  const typingSpeed = 1500;
  const speed = "50";
  const line1 = "BlockBadge Platform";

  if (nextLine < 10) {
    setTimeout(() => {
      setNextLine(nextLine + 1);
      // console.log(nextLine);
    }, typingSpeed);
  }
  return (
    <>
      <NavBar back="0" next="1" />
      <div className="container mx-auto">
        <div className="text-3xl font-bold m-4">
          <TypeWriterOnce text={"Table of Contants"} speed={speed} />
        </div>
        <div className="text-2xl">
          <ul className="list-disc pl-4">
            {nextLine >= 1 && (
              <li>
                <TypeWriterOnce text={"Overall"} speed={speed} />
              </li>
            )}
            {nextLine >= 2 && (
              <li>
                <TypeWriterOnce text={"Resolver Contract"} speed={speed} />
              </li>
            )}
            {nextLine >= 3 && (
              <li>
                <TypeWriterOnce text={"Tests"} speed={speed} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
