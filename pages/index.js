import dynamic from "next/dynamic";

const BlockBadge = dynamic(() => import("../Containers/Homepage/01BlockBadge"));
const What = dynamic(() => import("../Containers/Homepage/02What"));
const Why = dynamic(() => import("../Containers/Homepage/03Why"));
const How = dynamic(() => import("../Containers/Homepage/04How"));
const ProblemsWeSolve = dynamic(() =>
  import("../Containers/Homepage/05ProblemsWeSolve")
);
const Footer = dynamic(() => import("../Containers/Homepage/06Footer"));

export default () => {
  return (
    <>
      <BlockBadge />
      <What />
      <Why />
      <How />
      <ProblemsWeSolve />
      <Footer />
      {/* </div> */}
    </>
  );
};
