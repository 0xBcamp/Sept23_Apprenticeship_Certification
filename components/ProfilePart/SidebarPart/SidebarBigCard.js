import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
// import Sidebar from "/components/Sidebar";
import SidebarItems from "./SidebarItems";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
export default () => {
  const [selected, setSelected] = useState(false);
  const a = (e) => {};
  return (
    <Sidebar className="h-full">
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem component={<Link href="/BBP/Overview" />}>
          Documentation
        </MenuItem>
        <MenuItem component={<Link href="/calendar" />}> Calendar</MenuItem>
        <MenuItem component={<Link href="/e-commerce" />}> E-commerce</MenuItem>
      </Menu>
    </Sidebar>
  );
  // return (
  //   <Sidebar>
  //     <SidebarItems
  //       text="Overveiw"
  //       active={selected}
  //       onClick={(e) => console.log(e.target)}
  //     />
  //     <SidebarItems text={"Certifications"} active={() => setSelected(true)} />
  //     <SidebarItems text={"Reputations"} active={() => setSelected(true)} />
  //   </Sidebar>
  // );
};

// import { EASSlicedAddress } from "/components/Commons";
// import Link from "next/link";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import { useAccount } from "wagmi";
// import { useEffect, useState } from "react";

// export default () => {
//   const { address } = useAccount();
//   const [account, setAccount] = useState("");
//   useEffect(() => {
//     setAccount(address);
//   }, [address]);
//   return (
//     <>
//       <div>
//         <div>
//           <Link
//             href="/BBP/Overview"
//             className="Primary__Click"
//             style={{ width: "100%" }}
//           >
//             Overveiw
//           </Link>
//         </div>
//         <div>
//           <Link
//             href="/BBP/AllCert"
//             className="Primary__Click"
//             style={{ width: "100%" }}
//           >
//             Certifications
//           </Link>
//         </div>
//         <div>
//           <Link
//             href="/BBP/AllRep"
//             className="Primary__Click"
//             style={{ width: "100%" }}
//           >
//             Reputations
//           </Link>
//         </div>
//       </div>
//     </>
//     //   </CardContent>
//     // </Card>
//   );
// };
