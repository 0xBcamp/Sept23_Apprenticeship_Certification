import { TypeWriterOnce } from "@/components/Commons";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
const Section1 = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });
  return (
    <main className="flex flex-col gap-2 justify-center mx-14 items-center text-white ">
      <Fade direction="down" duration={2000}>
        <h1 className="text-9xl font-bold text-white">
          <TypeWriterOnce text=" BlockBadge" />
        </h1>
        <p className="text-2xl ">Proof of Excellence, Verified Securely</p>
      </Fade>
    </main>
  );
};
export default Section1;
