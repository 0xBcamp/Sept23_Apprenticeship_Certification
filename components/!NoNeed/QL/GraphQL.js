import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
// import networkMapping from "../constants/networkMapping.json";
// import { GET_ACTIVE_ITEMS } from "@/constants/subgraphQueries";
import { useQuery, gql } from "@apollo/client";
// import NFTBox from "@/components/NFTBox";
import { Loading, Select } from "web3uikit";

export default () => {
  const GET_ACTIVE_ITEMS = gql`
    {
      getSchema(
        where: {
          id: "0xb28844791177681bd44d983e8aaa017f6a378e297271a46fd20d81a5cbadc386"
        }
      ) {
        creator
        id
        schema
        resolver
        revocable
        index
        txid
        time
      }
    }
  `;

  //   const [marketplaceAddress, setMarketplaceAddress] = useState("");
  const { isWeb3Enabled } = useMoralis();
  const { loading, error, data: listedNFTs } = useQuery(GET_ACTIVE_ITEMS);
  if (loading) return <p>Loading</p>;
  if (listedNFTs) {
    console.log(listedNFTs);
    return (
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-2">
          {/* 
        {isWeb3Enabled ? (
          loading || !listedNFTs ? (
            <>
              <div
                style={{
                  borderRadius: "8px",
                  padding: "20px",
                }}
              >
                <Loading
                  fontSize={12}
                  size={12}
                  spinnerColor="#2E7DAF"
                  spinnerType="wave"
                  text="Loading..."
                />
              </div>
            </>
          ) : (
            listedNFTs.activeItems.map((nft) => {
              const { nftAddress, tokenId, price, seller } = nft;
              // console.log(`nft is: ${nftAddress}`);
              return (
                <>
                  <NFTBox
                    marketplaceAddress={marketplaceAddress}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    seller={seller}
                    price={price}
                    key={`${nftAddress}${tokenId}`}
                  />
                </>
              );
            })
          )
        ) : (
          <div>Please connect your wallet</div>
        )} */}
        </div>
      </div>
    );
  }
};
