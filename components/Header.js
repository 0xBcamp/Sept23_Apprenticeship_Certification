"use client";
import Link from "next/link";
import Headroom from "headroom.js";
import { useEffect, useState } from "react";
const IMG = "/logo.png";
import { parse } from "url";
import { Input } from "@mui/material";

export default () => {
  const [selected, setSelected] = useState(0);

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
      <div className="flex items-center">
        <Input
          className="text-white w-80 mr-4 p-2"
          placeholder="Search accounts, 0x or name.Blockbadge..."
        />
        <w3m-button />
      </div>
    </nav>
  );
};
