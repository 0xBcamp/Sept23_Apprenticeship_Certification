import { useContext, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { SkeletonTextModal, ErrorPage } from "@/components/Commons";
import SingleCard from "./SingleCard";
import { ContractContext } from "@/Context/ContractContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const seeMore = 3;

export default () => {
  const { GET_ATTESTATIONS_QUERY, getMyAddress } = useContext(ContractContext);
  // const { account } = useMoralis();
  const [accountAddress, setAccountAddress] = useState("");

  useEffect(() => {
    const func = async () => {
      setAccountAddress(await getMyAddress());
    };
    func();
  }, []);
  const schema =
    "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";
  // const accountAddress = "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe";

  const {
    loading,
    error,
    data: eas,
  } = useQuery(GET_ATTESTATIONS_QUERY, {
    variables: {
      account: accountAddress,
      schema: schema,
    },
  });

  if (error) return <ErrorPage CardName="Reputations" />;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <h1 className="text-2xl">Reputations</h1>
        {loading ? (
          <div className="space-y-2">
            <SkeletonTextModal />
            <SkeletonTextModal />
            <SkeletonTextModal />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            {eas.attestations.slice(0, seeMore).map((item, index) => {
              return <SingleCard key={index} item={item} />;
            })}
            {eas.attestations.length === 0 && (
              <div>There are no any feekback.</div>
            )}
          </div>
        )}
        {eas?.attestations.length > seeMore && (
          <>
            <Link href="/BBP/AllRep" className="underline">
              More feekbacks
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
};
