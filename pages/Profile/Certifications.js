import { TypeWriterOnce } from "/components/Commons";
import CertificationBigCard from "../../components/ProfilePart/CertificationBigCard";
export default () => {
  return (
    <div className="h-full p-2 rounded-xl bg-[#1b1b2e]">
      {/* <h1 className="text-xl font-bold">
        <TypeWriterOnce text="Certifications" />
      </h1> */}
      <CertificationBigCard seeMoreCert={0} />
    </div>
  );
};
