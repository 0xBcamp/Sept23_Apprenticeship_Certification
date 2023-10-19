import { useContext, useEffect, useState } from "react";
import { Card } from "web3uikit";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import {
  SkeletonTextModal,
  ErrorPage,
  TypeWriterOnce,
} from "@/components/Commons";
import SingleCard from "@/components/ProfilePart/SingleCard";
import { ContractContext } from "../Context/ContractContext";
import { useMoralis } from "react-moralis";
export default () => {
  const { GET_ATTESTATIONS_QUERY, getMyAddress } = useContext(ContractContext);
  const { account } = useMoralis();
  const [accountAddress, setAccountAddress] = useState("");

  useEffect(() => {
    const func = async () => {
      setAccountAddress(await getMyAddress());
    };
    func();
  }, [account]);
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
    <>
      <Link href={"/Profile"} className="Link__Back">
        Back
      </Link>
      <h1 className="text-xl font-bold">
        <TypeWriterOnce text="Reputations" />
      </h1>
      <Card>
        {loading ? (
          <div className="space-y-2">
            <SkeletonTextModal />
            <SkeletonTextModal />
            <SkeletonTextModal />
          </div>
        ) : (
          <>
            {eas.attestations.map((item) => {
              return <SingleCard item={item} />;
            })}
            {eas.attestations.length === 0 && (
              <div>There are no any feekback.</div>
            )}
          </>
        )}
      </Card>
    </>
  );
};
