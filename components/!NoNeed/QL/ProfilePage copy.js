import { useMoralis } from "react-moralis";
import { useQuery, gql } from "@apollo/client";

export default () => {
  const GET_ACTIVE_ITEMS = gql`
    {
      attestations(
        where: {
          attester: { equals: "0x728e124340b2807eD0cc5B2104eD5c07cceFa0Ec" }
        }
      ) {
        data
        id
        recipient
      }
    }
  `;

  const { loading, error, data: listedNFTs } = useQuery(GET_ACTIVE_ITEMS);
  if (loading) return <p>Loading</p>;
  if (error) console.log(error);
  if (listedNFTs) {
    const handleClick = () => {
      console.log(listedNFTs);
    };
    return (
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleClick}
            className="w-72 p-2 mt-4 Primary__Click"
          >
            View Attestation
          </button>
        </div>
      </div>
    );
  }
};
