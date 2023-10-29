// "use client";
// import { db } from "/Constants/Context/FirebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";

// import { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
// import StudentsRegisteration from "./StudentsRegisteration";
// import AddProgram from "./AddProgram";
// import WaitModal from "/components/Modals/WaitModal";

// export default () => {
//   const { isConnected, address } = useAccount();

//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     if (isConnected) {
//       setLoading(true);
//       const handleQuery = async () => {
//         const stdRef = collection(db, "Admins");
//         const q = query(stdRef, where("Address", "==", address));
//         const querySnapshot = await getDocs(q);
//         const data = [];
//         querySnapshot.forEach((doc) => {
//           data.push(doc.data().Address);
//         });

//         const accountData = [...new Set(data)];
//         console.log(accountData);
//         if (accountData.length > 0) {
//           setIsAdmin(true);
//         } else {
//           setIsAdmin(false);
//         }
//         setLoading(false);
//       };
//       handleQuery();
//     }
//   }, [address]);
//   if (loading) return <WaitModal open={true} onClose={false} />;

//   if (isAdmin)
//     return (
//       <div className="container mx-auto">
//         <AddProgram />
//       </div>
//     );
//   if (!isAdmin)
//     return (
//       <div className="container mx-auto">
//         <StudentsRegisteration />
//       </div>
//     );
// };

import React from "react";

export default function index() {
  return <div>index</div>;
}
