import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { SkeletonTextModal, ErrorPage } from "/components/Commons";
import SingleCertificationCard from "./SingleCertificationCard";
import { ContractContext } from "/Constants/Context/ContractContext";

export default ({ seeMoreCert }) => {
  const { GET_ATTESTATIONS_QUERY, addressFromSearchbar } =
    useContext(ContractContext);
  const [address, setAddress] = useState("");
  const [seeMore, setSeeMore] = useState(2);
  useEffect(() => {
    setAddress(addressFromSearchbar);
    if (seeMoreCert == 0) {
      setSeeMore(undefined);
    }
  }, [addressFromSearchbar]);
  const schema =
    "0xef1043622639b4317241f788ff4ad352e80a3b7b3e67e39cf03b7b59d550fe1d";

  const {
    loading,
    error,
    data: eas,
  } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      account: address,
      schema: schema,
    },
  });

  if (error) return <ErrorPage CardName="Certifications" />;

  return (
    <div className="bigCard h-full w-full text-white">
      <h1 className="text-2xl">Certifications</h1>
      {loading ? (
        <div className="space-y-2">
          <SkeletonTextModal />
          <SkeletonTextModal />
          <SkeletonTextModal />
        </div>
      ) : (
        <div className="flex flex-col">
          {eas.attestations.slice(0, seeMore).map((item, index) => {
            return <SingleCertificationCard key={index} item={item} />;
          })}
          {eas.attestations?.length === 0 && (
            <div>There are no any certificates.</div>
          )}
        </div>
      )}
      {eas?.attestations?.length > seeMore && (
        <Link href="/Profile/Certifications" className="underline">
          More Certificates
        </Link>
      )}
    </div>
  );
};

// 0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f"  0x6A5951dA6E9F0871e7Fa4D4EE785db0B3489eBb6
