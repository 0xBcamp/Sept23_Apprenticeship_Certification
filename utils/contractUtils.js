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
  "0xef1043622639b4317241f788ff4ad352e80a3b7b3e67e39cf03b7b59d550fe1d";
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
