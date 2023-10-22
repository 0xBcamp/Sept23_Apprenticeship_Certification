import Link from "next/link";
// import { ConnectButton } from "web3uikit";
import { EASImage } from "./Commons";
import DarkModeToggle from "./DarkLightMode";
import Headroom from "headroom.js";
import { useEffect } from "react";
const IMG = "/logo2.png";
export default () => {
  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  });
  return (
    <nav
      id="navbar-main"
      className="navbar-transparent navbar-light headroom head border-b-2 flex flex-row justify-between items-center"
    >
      <h1 className="mr-4 p-3">
        <Link href={"/"}>
          <EASImage
            name={"Logo"}
            imageSrc={IMG}
            ImgWidth={"80"}
            // ImgHeight={"80"}
          />
        </Link>
      </h1>
      <div className="flex font-bold flex-row items-center space-x-4">
        <Link className="mr-4 p-3 text-white" href="/BBP/">
          Home
        </Link>

        <Link className="mr-4 p-3 text-white" href="/BBP/Attestations">
          Attestations
        </Link>

        <Link className="mr-4 p-3 text-white" href="/Profile">
          Profile
        </Link>
        {/* <DarkModeToggle /> */}
        {/* <ConnectButton moralisAuth={false} /> */}
      </div>
    </nav>
  );
};
