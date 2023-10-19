import React from "react";
import BlockSurveyCardCopy from "./BlockSurveyCard copy";
import { ENSAvatar } from "web3uikit";
import { useMoralis } from "react-moralis";

export default () => {
  const { account } = useMoralis();
  const a = <ENSAvatar address={account} size={50} />;

  console.log(a);
};
