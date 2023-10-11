import { useEffect, useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

// const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export default ({ EASContractAddress }) => {
  let eas;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  eas = new EAS(EASContractAddress);
  eas.connect(signer);
  return eas;
};
