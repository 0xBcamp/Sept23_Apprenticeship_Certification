import Link from "next/link";
import { EASImage } from "./Commons";
import DarkModeToggle from "./DarkLightMode";
import Headroom from "headroom.js";
import { useEffect, useState } from "react";
const IMG = "/logo2.png";
import { parse } from "url";
import { Button, Icon, Input } from "@mui/material";

export default () => {
  const [selected, setSelected] = useState(0);

  let currentUrl = "/";
  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  });
  useEffect(() => {
    currentUrl = window.location.href;
    const parsedUrl = parse(currentUrl, true);

    const urlPath = parsedUrl.path;
    console.log(urlPath);

    if (urlPath == "/BBP") {
      setSelected(1);
      return;
    }
    if (urlPath == "/BBP/Attestations") {
      setSelected(2);
      return;
    }
    // if (urlPath == "/Profile") {
    //   document.getElementById("navbar-main").style.visibility = "hidden";

    //   setSelected(3);
    //   return;
    // }
    // document.getElementById("navbar-main").style.visibility = "visible";

    setSelected(0);
  }, [currentUrl]);
  return (
    <nav
      id="navbar-main"
      className="navbar-transparent headroom head flex flex-row justify-between items-center"
    >
      <div className="flex font-bold flex-row items-center">
        <div>
          <Input
            className="text-white w-80 m-2 p-2"
            placeholder="Search accounts, NTFs, DAOs, Tokens..."
          />
        </div>
        <div className="flex font-bold flex-row items-center">
          <Icon aria-label="aaa" aria-busy={true} />
          <Link className="mr-4 p-3 " href="/BBP/">
            {selected == 1 ? (
              <div className="border-b-2 text-blue-700">Home</div>
            ) : (
              <>Home</>
            )}
          </Link>

          <Link className="mr-4 p-3 " href="/BBP/Attestations">
            {selected == 2 ? (
              <div className="border-b-2 text-blue-700">Attestations</div>
            ) : (
              <>Attestations</>
            )}
          </Link>

          <Link className="mr-4 p-3 " href="/Profile">
            {selected == 3 ? (
              <div className="border-b-2 text-blue-700">Profile</div>
            ) : (
              <>Profile</>
            )}
          </Link>
          {/* <DarkModeToggle /> */}
        </div>
      </div>
      <w3m-button />
    </nav>
  );
};
