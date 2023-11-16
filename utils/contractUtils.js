import { ethers } from "ethers";

import BlockBadgeBNSAbi from "/Constants/BlockBadgeBNS.json";
import OrganizationResolverAbi from "/Constants/OrganizationResolver.json";
import BlockBadgeSBTAbi from "/Constants/BlockBadgeSBT.json";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export const BlockBadgeSBTAddress =
  "0xc2DCE87f1073006535df3162AaAb2a64F3B7Bb14";

export const BlockBadgeBNS = "0x353998eF92fE5990cDa2551AFC8967b5c2749adC";

export const OrganizationResolverAddress =
  "0xd0Cc2f9fAd06c7F5012aDebC65D4f299453d6F76";
/*
Schemas
*/
export const certificationSchemaUID =
  "0xb20aba3edbb9fa19c4893150e723dcd9aa756d91f9af5a9094a69b37301eeb9b";
// export const certificationSchemaUID =
//   "0xab7e8c710f58f652b3aadec134cc30f24c0c8cd23cbf135192233f9605f8317c";
export const reputationSchemaUID =
  "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";
export const createBlockBadgeSBTContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    BlockBadgeSBTAddress,
    BlockBadgeSBTAbi,
    signer
  );
  return contract;
};

export const createBlockBadgeBNSContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(BlockBadgeBNS, BlockBadgeBNSAbi, signer);
  return contract;
};

export const createOrganizationResolverContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    OrganizationResolverAddress,
    OrganizationResolverAbi,
    signer
  );
  return contract;
};

export const AddressToBNS = async (searchQuery) => {
  const contract = await createBlockBadgeBNSContract();

  // Check if the search query looks like an Ethereum address
  const resolvedName = await contract.resolveAddress(searchQuery);
  if (!resolvedName) return;
  return resolvedName;
};

export const BNSToAddress = async (searchQuery) => {
  const contract = await createBlockBadgeBNSContract();

  // If not an Ethereum address, treat it as a BNS name
  let formattedQuery = searchQuery;
  if (!searchQuery.endsWith(".blockbadge")) {
    formattedQuery += ".blockbadge";
  }
  // Integrate with the BlockBadgeBNS contract to resolve the BNS name to an address
  const resolvedAddress = await contract.resolveName(formattedQuery);

  if (
    resolvedAddress &&
    resolvedAddress !== "0x0000000000000000000000000000000000000000"
  ) {
    return { formattedQuery, resolvedAddress };
  }
};
