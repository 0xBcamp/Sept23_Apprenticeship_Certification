import { useEffect, useState } from "react";
import { EASSlicedAddress } from "/components/Commons";
import { useAccount } from "wagmi";

export default ({ children, address }) => {
  const { searchedAddress, searchedBNSName } = address;
  console.log(address);
  return (
    <aside className="bigCard h-full">
      <nav className="h-full flex flex-col shadow-sm">
        <div className="bigCard border-b-black border-b-8 border-t-2 border-l-2 shadow-2xl p-4 pb-2 flex justify-between items-center">
          <img className="w-20" src="/logo2.png" alt="" />

          {searchedBNSName ? (
            <h1 className="text-xl font-bold">{searchedBNSName}</h1>
          ) : (
            <h1 className="text-xl font-bold">My Account</h1>
          )}

          <EASSlicedAddress Address={searchedAddress} />
        </div>
        <div className="p-4 pb-2 flex flex-col  items-center">
          {/* <div className="border">
          <ENSAvatar address={accountAddress} size={100} />
        </div> */}
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div
          className="bigCard flex p-3 bg-gradient-to-bl from-indigo-900"
          style={{ backgroundColor: "#2E2E48" }}
        >
          <div className="flex justify-between items-center w-52 ml-3">
            <div className="leading-4">
              <img src="/images/Vector.svg" alt="" className="w-10" />
              <h6 className="font-semibold">Attest This Wallet</h6>
              <span className="text-xs text-gray-600">
                Let others know you
                <br /> know this person
              </span>
            </div>
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
