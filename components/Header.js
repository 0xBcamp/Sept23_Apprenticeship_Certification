"use client";
import Link from "next/link";
import Headroom from "headroom.js";
import { useContext, useEffect, useState } from "react";
const IMG = "/logo.png";
import { Input } from "@mui/material";
import { useRouter } from "next/router";
import { createBlockBadgeBNSContract } from "../utils/contractUtils";
import { ContractContext } from "../Constants/Context/ContractContext";

export default () => {
  const router = useRouter();

  const { setAddressFromSearchbar, setBNSFromSearchbar } =
    useContext(ContractContext);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Check if the search query looks like an Ethereum address
    if (searchQuery.startsWith("0x")) {
      // Navigate directly to the profile page of the address
      const profileUrl = `/Profile?id=${searchQuery}`;
      const contract = await createBlockBadgeBNSContract();
      const resolvedName = await contract.resolveAddress(searchQuery);
      if (resolvedName) {
        setBNSFromSearchbar(resolvedName);
      } else {
        setBNSFromSearchbar("");
      }

      setAddressFromSearchbar(searchQuery);
      router.push(profileUrl);
      return;
    }

    // If not an Ethereum address, treat it as a BNS name
    let formattedQuery = searchQuery;
    if (!searchQuery.endsWith(".blockbadge")) {
      formattedQuery += ".blockbadge";
    }

    // Integrate with the BlockBadgeBNS contract to resolve the BNS name to an address
    const contract = await createBlockBadgeBNSContract();
    const resolvedAddress = await contract.resolveName(formattedQuery);

    if (
      resolvedAddress &&
      resolvedAddress !== "0x0000000000000000000000000000000000000000"
    ) {
      // Navigate to the profile page of the resolved address
      const profileUrl = `/Profile?id=${resolvedAddress}`;
      setAddressFromSearchbar(resolvedAddress);
      setBNSFromSearchbar(formattedQuery);
      router.push(profileUrl);
    } else {
      // Handle the case where the BNS name doesn't exist
      console.log("BNS name not found");
    }
  };

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
        <img src={IMG} alt="Logo" className="h-10 w-auto mr-20" />
        <div className="flex font-bold flex-row items-center">
          <Link className="mr-4 p-3 " href="/Home/">
            Home
          </Link>

          <Link className="mr-4 p-3 " href="/Home/Attestations">
            Attestations
          </Link>

          <Link className="mr-4 p-3 " href="/Profile">
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
        />
        <button type="submit" className="hidden"></button>{" "}
        {/* Hidden submit button to handle form submission */}
        <w3m-button />
      </form>
    </nav>
  );
};
