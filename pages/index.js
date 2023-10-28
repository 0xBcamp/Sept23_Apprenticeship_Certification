import dynamic from "next/dynamic";

const BlockBadge = dynamic(() => import("../Containers/Index/01BlockBadge"));
const What = dynamic(() => import("../Containers/Index/02What"));
const Why = dynamic(() => import("../Containers/Index/03Why"));
const How = dynamic(() => import("../Containers/Index/04How"));
const ProblemsWeSolve = dynamic(() =>
  import("../Containers/Index/05ProblemsWeSolve")
);
const Footer = dynamic(() => import("../Containers/Index/06Footer"));

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
