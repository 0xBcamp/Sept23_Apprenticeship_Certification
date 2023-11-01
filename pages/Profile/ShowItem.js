import { useEffect, useState } from "react";
import Certifications from "./Certifications";
import Overview from "./Overview";
import Reputations from "./Reputations";

export default ({ item, address }) => {
  const [newAddress, setNewAddress] = useState("");
  useEffect(() => {
    const { searchedAddress } = address;

    setNewAddress(searchedAddress);
  }, [address]);

  if (item === "Overview") return <Overview address={newAddress} />;
  if (item === "Certifications") return <Certifications address={newAddress} />;
  if (item === "Reputations") return <Reputations address={newAddress} />;
};
