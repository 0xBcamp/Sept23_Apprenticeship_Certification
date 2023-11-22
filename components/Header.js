"use client";
import Link from "next/link";
import Headroom from "headroom.js";
import { useContext, useEffect, useState } from "react";
const IMG = "/logo.png";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";
import { AddressToBNS, BNSToAddress } from "../utils/contractUtils";
import { ContractContext } from "../Constants/Context/ContractContext";
import { Search } from "@mui/icons-material";
import { ethers } from "ethers";

export default () => {
  const router = useRouter();

  const { setAddressFromSearchbar, setBNSFromSearchbar } =
    useContext(ContractContext);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchQuery.startsWith("0x")) {
        const profileUrl = `/Profile?id=${searchQuery}`;
        const a = await AddressToBNS(searchQuery);
        setBNSFromSearchbar(a);
        setAddressFromSearchbar(searchQuery);

        router.push(profileUrl);
        return;
      }

      const b = await BNSToAddress(searchQuery);
      if (!b) {
        alert("This name not registered to BNS system.");
        return;
      }
      setBNSFromSearchbar(b.formattedQuery);
      setAddressFromSearchbar(b.resolvedAddress);
      const profileUrl = `/Profile?id=${b.resolvedAddress}`;
      router.push(profileUrl);
    } catch (error) {
      console.log(error);
      alert("Error occurred while processing.");
    }
  };
  useEffect(() => {
    const checkChainID = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const chainID = (await provider.getNetwork()).chainId;
      console.log(chainID);
      if (chainID.toString() != "11155111") {
        alert("Please switch to Sepolia testnet.");
        return;
      }
    };
    checkChainID();
  }, []);

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  });

  return (
    <nav
      id="navbar-main"
      className="navbar-transparent headroom head flex flex-row justify-between items-center px-8"
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href={"/"}>
          <img src={IMG} alt="Logo" className="h-10 w-auto mr-20" />
        </Link>
        <div className="flex font-bold flex-row items-center">
          <Link className="mr-2 p-3 " href="/Home/">
            Home
          </Link>

          <Link className="mr-2 p-3 " href="/Home/Attestations">
            Attestations
          </Link>

          <Link className="mr-2 p-3 " href="/Profile">
            Profile
          </Link>
        </div>
      </div>

      {/* Search Bar and Button */}
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <Input
          className="text-white w-80 mr-4 p-2"
          placeholder="Search accounts, 0x or name.Blockbadge..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={!searchQuery}
                className="font-bold text-black"
                onClick={handleSearchSubmit}
                edge={"end"}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
        <button type="submit" className="hidden"></button>
        {/* Hidden submit button to handle form submission */}
        <w3m-button />
      </form>
    </nav>
  );
};
