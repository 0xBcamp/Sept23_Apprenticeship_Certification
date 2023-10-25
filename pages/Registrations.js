"use client";
import { get, push, set, ref } from "firebase/database";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { database } from "@/Context/FirebaseConfig";
import { TypeWriterOnce } from "@/components/Commons";
import hash from "hash.js";

export default () => {
  const { isConnected, address: apprAddress } = useAccount();
  // const [connectionStat, setConnectionStat] = useState(false);
  const [apprenticeName, setApprenticeName] = useState("");
  // const [certificationName, setCertificationName] = useState("");
  // const [customFeedback, setCustomFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [attestUID, setAttestUID] = useState(
    "0x8505c647d0bd479df4b346d571b0cdab77be750ea6c9810f729ceeda4014b8c5"
  );

  const [internshipCompletion, setInternshipCompletion] = useState("");
  //  const[ address, setAddress] = useState("")
  const [internshipProvider, setInternshipProvider] = useState("");
  const [date, setDate] = useState("");
  //  const[ address, setAddress] = useState("")
  const [completed, setCompleted] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const handleSubmit = async () => {
    if (!address) {
      alert("Please enter an address!");
      return;
    }
    if (!apprenticeName) {
      alert("Please enter a apprenticeName!");
      return;
    }
    // if (!certificationName) {
    //   alert("Please enter a certificationName!");
    //   return;
    // }

    // if (!customFeedback) {
    //   alert("Please enter a customFeedback!");
    //   return;
    // }
    let userRef;
    try {
      userRef = ref(database, "users");
      const newDataRef = push(userRef);
      set(newDataRef, {
        // type: internshipCompletion,
        apprenticeName: apprenticeName,
        participantAddress: apprAddress,
        // internship: internshipProvider,
        // endDate: new Date()/1000,
        mentorAddress: address,
        // status: completed,
        // hash: address,
      });
      alert("Done!!!");
    } catch (error) {
      console.error(error);
    }
  };
  const handleFetch = () => {
    const usersRef = ref(database, "users");

    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        setUsers(usersArray);
        console.log(usersArray);
      } else {
        console.log("No Data");
      }
    });
    for (let user of users) {
      console.log(user.participantAddress);
    }
  };

  const handleHash = () => {
    const hashedData = hash.sha256().update(users[0]).digest("hex");
    console.log(hashedData);
  };
  return (
    <>
      <div className="flex flex-col grid-cols-2 items-center">
        <h1 className="text-xl font-bold">
          <TypeWriterOnce text="Add a Certificate" />
        </h1>
        <input
          className="w-72 p-2 mt-4 Primary__Text border"
          type="text"
          placeholder="Enter apprentice name..."
          value={apprenticeName}
          onChange={(e) => setApprenticeName(e.target.value)}
        />
        {/* <input
          className="w-72 p-2 mt-4 Primary__Text border"
          type="text"
          placeholder="Enter certification name..."
          value={certificationName}
          onChange={(e) => setCertificationName(e.target.value)}
        /> */}
        <input
          className="w-72 p-2 mt-4 Primary__Text border"
          type="text"
          placeholder="Enter address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* <input
          className="w-72 p-2 mt-4 Primary__Text border"
          type="text"
          placeholder="Your Feedback..."
          value={customFeedback}
          onChange={(e) => setCustomFeedback(e.target.value)}
        /> */}
        {/* <DatePicker
          className="w-72 p-7 "
          label="Completed on date"
          value={completedOnDate}
          onChange={(e) => {
            setCompletedOnDate(e.date / 1000);
            console.log(e.date / 1000);
          }}
        /> */}

        <button onClick={handleSubmit} className="w-72 p-2 mt-4 Primary__Click">
          Submit Attestation
        </button>
        <button onClick={handleFetch} className="w-72 p-2 mt-4 Primary__Click">
          Fetch Attestation
        </button>
        <button onClick={handleHash} className="w-72 p-2 mt-4 Primary__Click">
          Hash
        </button>

        {/* {isLoading && <p className="mt-4">Wait...</p>}
        {attestUID && (
          <p className="mt-4">
            New Attest UID:
            <Link
              href={`https://sepolia.easscan.org/attestation/view/${attestUID}`}
              target="_blank"
              className="underline"
            >
              {" "}
              Open EAS Scan
            </Link>
          </p>
        )} */}
      </div>
      {/* ) : (
        <>Please connect your wallet</>
      )} */}
    </>
  );
};

/*
{
  "type": ${internshipCompletion},
  "participantAddress": ${ethereumAddress},
  "internship": ${internshipProvider},
  "startDate": ${date},
  "endDate": ${date},
  "mentorAddress": ${ethereumAddress},
  "status": ${completed/in-progress/failed},
  "hash": ${hashOfTheAboveDetails}
}
*/
