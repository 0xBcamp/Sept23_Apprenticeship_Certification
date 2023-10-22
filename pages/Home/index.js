import dynamic from "next/dynamic";

const Section0 = dynamic(() => import("./Section0"));
const Section1 = dynamic(() => import("./Section1"));
const Section2 = dynamic(() => import("./Section2"));
const Section3 = dynamic(() => import("./Section3"));
const Section4 = dynamic(() => import("./Section4"));

export default () => {
  return (
    <>
      <Section0 />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      {/* </div> */}
    </>
  );
};
