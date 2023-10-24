import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { EASSlicedAddress } from "./Commons";
import { useAccount } from "wagmi";

export default ({ children }) => {
  const { address } = useAccount();

  const [account, setAccount] = useState("");
  useEffect(() => {
    setAccount(address);
  }, [address]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const getWindowSize = () => {
    setWindowWidth(window.innerWidth);
    console.log(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    if (windowWidth < 400) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, [windowWidth]);
  return (
    <aside className=" bigCard h-full">
      <nav className="h-full flex flex-col   shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img className="w-20" src="/logo2.png" alt="" />
          <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-200">
            <img src="/moon.svg" alt="" className="w-20" />
          </button>
        </div>
        <div className="p-4 pb-2 flex flex-col  items-center text-black">
          {/* <div className="border">
          <ENSAvatar address={accountAddress} size={100} />
        </div> */}
          <h1 className="text-2xl font-bold">My Account</h1>

          <EASSlicedAddress Address={account} />
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="flex p-3">
          <img className="w-10 h-10 rounded-md" src="/moon.svg" alt="" />
          <div
            className={`
            flex justify-between items-center
            w-52 ml-3
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">MMMME</h4>
              <span className="text-xs text-gray-600">MMMME</span>
            </div>
            <img src="/moon.svg" alt="" className="w-20" />
          </div>
        </div>
      </nav>
    </aside>

    // <nav className="Sidebar">
    //   <Sidebar collapsed={collapse}>
    //     <Menu>
    //       <MenuItem component={<Link href="/BBP/Attestations" />}>
    //         Documentation
    //       </MenuItem>
    //       <MenuItem component={<Link href="/BBP/Attestations" />}>
    //         Documentation
    //       </MenuItem>
    //     </Menu>
    //     <Menu
    //     //   menuItemStyles={{
    //     //     button: {
    //     //       // the active class will be added automatically by react router
    //     //       // so we can use it to style the active menu item
    //     //       [`&.active`]: {
    //     //         backgroundColor: "#00000",
    //     //         color: "#b6c8d9",
    //     //       },
    //     //     },
    //     //   }}
    //     >
    //       <MenuItem component={<Link href="/BBP/Attestations" />}>
    //         Documentation
    //       </MenuItem>
    //       <MenuItem component={<Link href="/BBP/AllCert" />}>Calendar</MenuItem>
    //       <MenuItem component={<Link href="/BBP/AllRep" />}>
    //         E-commerce
    //       </MenuItem>
    //     </Menu>
    //   </Sidebar>
    // </nav>
  );
};
