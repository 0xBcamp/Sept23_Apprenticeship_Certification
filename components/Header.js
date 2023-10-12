<<<<<<< HEAD
import Link from "next/link";
import { ConnectButton } from "web3uikit";
import { EASImage } from "./Commons";
import DarkModeToggle from "./DarkLightMode";
const IMG = "/logo2.png";
export default () => {
  return (
    <nav className=" head p-5 border-b-2 flex flex-row justify-between items-center">
      <h1>
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
        <Link className="mr-4 p-6" href="/Home/">
          Home
        </Link>

        <Link className="mr-4 p-6" href="/Home/Attestations">
          Attestations
        </Link>

        <Link className="mr-4 p-6" href="/Profile">
          Profile
        </Link>
        <DarkModeToggle />
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
};
=======
import Link from "next/link";
import { ConnectButton } from "web3uikit";
import { EASImage } from "./Commons";
import DarkModeToggle from "./DarkLightMode";
const IMG = "/logo2.png";
export default () => {
  return (
    <nav className=" head p-5 border-b-2 flex flex-row justify-between items-center">
      <h1>
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
        <Link className="mr-4 p-6" href="/Home/">
          Home
        </Link>

        <Link className="mr-4 p-6" href="/Home/Attestations">
          Attestations
        </Link>

        <Link className="mr-4 p-6" href="/Profile">
          Profile
        </Link>
        <DarkModeToggle />
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
};
>>>>>>> origin/alfaqi
