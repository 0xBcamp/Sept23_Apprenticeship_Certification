"use client";
import Link from "next/link";
import Headroom from "headroom.js";
import { useEffect, useState } from "react";
const IMG = "/logo.png";
import { parse } from "url";
import { Input } from "@mui/material";
import { useRouter } from 'next/router';
import { createContract } from "../utils/contractUtils";

export default () => {

  const router = useRouter();

  const [selected, setSelected] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the search query looks like an Ethereum address
    if (searchQuery.startsWith("0x")) {
        // Navigate directly to the profile page of the address
        const profileUrl = `/Profile/${searchQuery}`;
        router.push(profileUrl);
        return;
    }

    // If not an Ethereum address, treat it as a BNS name
    let formattedQuery = searchQuery;
    if (!searchQuery.endsWith(".blockbadge")) {
        formattedQuery += ".blockbadge";
    }

    // Integrate with the BlockBadgeBNS contract to resolve the BNS name to an address
    const contract = await createContract();
    const resolvedAddress = await contract.resolveName(formattedQuery);
  
    if (resolvedAddress && resolvedAddress !== "0x0000000000000000000000000000000000000000") {
        // Navigate to the profile page of the resolved address
        const profileUrl = `/Profile/${resolvedAddress}`;
        router.push(profileUrl);
    } else {
        // Handle the case where the BNS name doesn't exist
        console.log('BNS name not found');
    }
};
  
  

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  });

  let currentUrl = /*window ? window.location.href : */ "/";

  useEffect(() => {
    const parsedUrl = parse(currentUrl, true);
    const urlPath = parsedUrl.path;
    console.log(urlPath);

    if (urlPath == "/Home") {
      setSelected(1);
      return;
    }
    if (urlPath == "/Home/Attestations") {
      setSelected(2);
      return;
    }
    if (urlPath == "/Profile") {
      setSelected(4);
      return;
    }
    setSelected(0);
  }, [currentUrl]);

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
            {selected == 1 ? (
              <div className="border-b-2 text-blue-700">Home</div>
            ) : (
              <>Home</>
            )}
          </Link>

          <Link className="mr-4 p-3 " href="/Home/Attestations">
            {selected == 2 ? (
              <div className="border-b-2 text-blue-700">Attestations</div>
            ) : (
              <>Attestations</>
            )}
          </Link>

          <Link className="mr-4 p-3 " href="/Profile">
            {selected == 4 ? (
              <div className="border-b-2 text-blue-700">Profile</div>
            ) : (
              <>Profile</>
            )}
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
        <button type="submit" className="hidden"></button>  {/* Hidden submit button to handle form submission */}
        <w3m-button />
      </form>
    </nav>
  );
};
