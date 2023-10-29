import Certifications from "./Certifications";
import Overview from "./Overview";
import Reputations from "./Reputations";

export default ({ item }) => {
  if (item === "Overview") return <Overview />;
  if (item === "Certifications") return <Certifications />;
  if (item === "Reputations") return <Reputations />;
};
