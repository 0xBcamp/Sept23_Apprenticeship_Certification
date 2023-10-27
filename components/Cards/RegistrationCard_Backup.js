// "use client";
// import { realTimeDB, db } from "@/Context/FirebaseConfig";
// // Realtime Database => For chating, online games
// import { get, push, set, ref } from "firebase/database";
// // Normal Database => Regular Database
// import { collection, addDoc } from "firebase/firestore";
// // Gain Auth
// import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

// import { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
// import { TypeWriterOnce } from "@/components/Commons";
// import hash from "hash.js";
// import { Fade, Grow } from "@mui/material";

// export default () => {
//   const { isConnected, address: apprAddress } = useAccount();
//   const [connectionStat, setConnectionStat] = useState(false);

//   const [apprenticeName, setApprenticeName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const [internshipCompletion, setInternshipCompletion] = useState("");
//   //  const[ address, setAddress] = useState("")
//   const [internshipProvider, setInternshipProvider] = useState("");
//   const [date, setDate] = useState("");
//   //  const[ address, setAddress] = useState("")
//   const [completed, setCompleted] = useState("");
//   const [address, setAddress] = useState("");
//   const [users, setUsers] = useState([]);

//   const handleSubmit = async () => {
//     if (!address) {
//       alert("Please enter an address!");
//       return;
//     }
//     if (!apprenticeName) {
//       alert("Please enter a apprenticeName!");
//       return;
//     }
//     // if (!certificationName) {
//     //   alert("Please enter a certificationName!");
//     //   return;
//     // }

//     // if (!customFeedback) {
//     //   alert("Please enter a customFeedback!");
//     //   return;
//     // }

//     try {
//       const userRef = ref(realTimeDB, "users");
//       const newDataRef = push(userRef);
//       set(newDataRef, {
//         // type: internshipCompletion,
//         apprenticeName: apprenticeName,
//         participantAddress: apprAddress,
//         // internship: internshipProvider,
//         // endDate: new Date()/1000,
//         mentorAddress: address,
//         // status: completed,
//         // hash: address,
//       });
//       alert("Done!!!");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleFetch = () => {
//     const usersRef = ref(realTimeDB, "users");

//     get(usersRef).then((snapshot) => {
//       if (snapshot.exists()) {
//         const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
//           id,
//           ...data,
//         }));
//         setUsers(usersArray);
//         console.log(usersArray);
//       } else {
//         console.log("No Data");
//       }
//     });
//     for (let user of users) {
//       console.log(user.participantAddress);
//     }
//   };

//   const handleSubmit2 = async () => {
//     // const auth = getAuth();

//     if (!address) {
//       alert("Please enter an address!");
//       return;
//     }
//     if (!apprenticeName) {
//       alert("Please enter a apprenticeName!");
//       return;
//     }

//     // signInAnonymously(auth)
//     //   .then(async () => {
//     try {
//       const userRef = await addDoc(collection(db, "Students"), {
//         Name: apprenticeName,
//         Address: apprAddress,
//         Program: address,
//       });
//       console.log(userRef);
//     } catch (error) {
//       console.error("aaaaa", error);
//     }
//     // })
//     // .catch((error) => {
//     //   const errorCode = error.code;
//     //   const errorMessage = error.message;
//     //   // ...
//     // });
//   };
//   const handleFetch2 = () => {
//     const usersRef = ref(database, "users");

//     get(usersRef).then((snapshot) => {
//       if (snapshot.exists()) {
//         const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
//           id,
//           ...data,
//         }));
//         setUsers(usersArray);
//         console.log(usersArray);
//       } else {
//         console.log("No Data");
//       }
//     });
//     for (let user of users) {
//       console.log(user.participantAddress);
//     }
//   };
//   const handleHash = () => {
//     const hashedData = hash.sha256().update(apprenticeName).digest("hex");
//     console.log(hashedData);
//   };
//   useEffect(() => {
//     setConnectionStat(isConnected);
//   }, [isConnected]);
//   return (
//     <>
//       {connectionStat ? (
//         <div className="flex flex-col grid-cols-2 items-center">
//           <h1 className="text-xl font-bold">
//             <TypeWriterOnce text="Add a Certificate" />
//           </h1>
//           <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
//             <input
//               className="w-72 p-2 mt-4 Primary__Text border"
//               type="text"
//               placeholder="Enter apprentice name..."
//               value={apprenticeName}
//               onChange={(e) => setApprenticeName(e.target.value)}
//             />
//           </Grow>
//           {/* <input
//           className="w-72 p-2 mt-4 Primary__Text border"
//           type="text"
//           placeholder="Enter certification name..."
//           value={certificationName}
//           onChange={(e) => setCertificationName(e.target.value)}
//         /> */}
//           <Fade in={true} timeout={2000}>
//             <input
//               className="w-72 p-2 mt-4 Primary__Text border"
//               type="text"
//               placeholder="Enter address..."
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </Fade>
//           {/* <input
//           className="w-72 p-2 mt-4 Primary__Text border"
//           type="text"
//           placeholder="Your Feedback..."
//           value={customFeedback}
//           onChange={(e) => setCustomFeedback(e.target.value)}
//         /> */}
//           {/* <DatePicker
//           className="w-72 p-7 "
//           label="Completed on date"
//           value={completedOnDate}
//           onChange={(e) => {
//             setCompletedOnDate(e.date / 1000);
//             console.log(e.date / 1000);
//           }}
//         /> */}
//           <Fade in={true} timeout={2000}>
//             <button
//               onClick={handleSubmit}
//               className="w-72 p-2 mt-4 Primary__Click"
//             >
//               Submit Attestation realTimeDB
//             </button>
//           </Fade>
//           <button
//             onClick={handleFetch}
//             className="w-72 p-2 mt-4 Primary__Click"
//           >
//             Fetch Attestation firestoreDBConfig
//           </button>
//           <button
//             onClick={handleSubmit2}
//             className="w-72 p-2 mt-4 Primary__Click"
//           >
//             Submit Attestation firestoreDB
//           </button>
//           <button
//             onClick={handleFetch2}
//             className="w-72 p-2 mt-4 Primary__Click"
//           >
//             Fetch Attestation firestoreDB
//           </button>
//           <button onClick={handleHash} className="w-72 p-2 mt-4 Primary__Click">
//             Hash
//           </button>

//           {/* {isLoading && <p className="mt-4">Wait...</p>}
//         {attestUID && (
//           <p className="mt-4">
//             New Attest UID:
//             <Link
//               href={`https://sepolia.easscan.org/attestation/view/${attestUID}`}
//               target="_blank"
//               className="underline"
//             >
//               {" "}
//               Open EAS Scan
//             </Link>
//           </p>
//         )} */}
//         </div>
//       ) : (
//         <>Please connect your wallet</>
//       )}
//     </>
//   );
// };

// /*
// {
//   "type": ${internshipCompletion},
//   "participantAddress": ${ethereumAddress},
//   "internship": ${internshipProvider},
//   "startDate": ${date},
//   "endDate": ${date},
//   "mentorAddress": ${ethereumAddress},
//   "status": ${completed/in-progress/failed},
//   "hash": ${hashOfTheAboveDetails}
// }
// */
