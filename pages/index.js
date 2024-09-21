import dynamic from "next/dynamic";

const BlockBadge = dynamic(() =>
  import("../Containers/Indexpage/01BlockBadge")
);
const What = dynamic(() => import("../Containers/Indexpage/02What"));
const Why = dynamic(() => import("../Containers/Indexpage/03Why"));
const How = dynamic(() => import("../Containers/Indexpage/04How"));
const ProblemsWeSolve = dynamic(() =>
  import("../Containers/Indexpage/05ProblemsWeSolve")
);
const Footer = dynamic(() => import("../Containers/Indexpage/06Footer"));

export default () => {
  return (
    <div className="w-[60vw] flex flex-col items-center mx-auto">
      <BlockBadge />
      <What />
      <Why />
      <How />
      <ProblemsWeSolve />
      <Footer />
    </div>
  );
};
