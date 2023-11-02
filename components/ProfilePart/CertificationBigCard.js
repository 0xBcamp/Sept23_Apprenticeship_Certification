import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { SkeletonTextModal, ErrorPage } from "/components/Commons";
import SingleCard from "./SingleCertificationCard";
import { ContractContext } from "/Constants/Context/ContractContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAccount } from "wagmi";

const seeMore = 3;
export default () => {
  const { GET_ATTESTATIONS_QUERY, addressFromSearchbar } =
    useContext(ContractContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(addressFromSearchbar);
  }, [addressFromSearchbar]);
  const schema =
    "0xd9858bc0a0b8b31f7547972c42827839baad9ac33bc43fb6499e58a2ddb56f8c";
  // const schema =
  //   "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";
  // const accountAddress = "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe";

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
            return <SingleCard key={index} item={item} />;
          })}
          {eas.attestations?.length === 0 && (
            <div>There are no any certificates.</div>
          )}
        </div>
      )}
      {eas?.attestations?.length > seeMore && (
        <Link href="/Home/AllCert" className="underline">
          More Certificates
        </Link>
      )}
    </div>
  );
};

// 0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f"  0x6A5951dA6E9F0871e7Fa4D4EE785db0B3489eBb6
