import { ethers } from "ethers";
import BlockBadgeBNSAbi from "../Constants/BlockBadgeBNS.json";

const BlockBadgeBNS = "0x353998eF92fE5990cDa2551AFC8967b5c2749adC";

export const createContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(BlockBadgeBNS, BlockBadgeBNSAbi, signer);
    return contract;
};
