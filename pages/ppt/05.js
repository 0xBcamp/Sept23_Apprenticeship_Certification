import { TypeWriterOnce } from "@/components/Commons";
import NavBar from "./NavBar";

export default () => {
  const speed = "10";

  return (
    <>
      <NavBar back="0" next="0" />
      <div className=" min-h-screen flex flex-col justify-center text-7xl font-bold items-center">
        <TypeWriterOnce text="THANKS" speed={speed} />
      </div>
    </>
  );
};
