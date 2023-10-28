"use client";
import { db } from "@/Constants/Context/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "@/components/Commons";
import hash from "hash.js";
import { Button, Fade, Grow, Input } from "@mui/material";

export default () => {
  const { isConnected, address: apprAddress } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const [apprenticeName, setApprenticeName] = useState("");
  const [address, setAddress] = useState("");

  const stdRef = collection(db, "Students");

  const handleSubmit = async () => {
    if (!address) {
      alert("Please enter an address!");
      return;
    }
    if (!apprenticeName) {
      alert("Please enter a apprenticeName!");
      return;
    }

    try {
      const std = await addDoc(stdRef, {
        Name: apprenticeName,
        Address: apprAddress,
        Program: address,
        Hash: handleHash(apprAddress),
      });
      console.log(std.id);
      alert("Done!!");
    } catch (error) {
      console.error("Erorr", error);
    }
  };
  const handleFetch = async () => {
    const query = await getDocs(stdRef);
    const data = [];
    query.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log(data);
  };

  const handleHash = (data) => {
    const hashedData = hash.sha256().update(data).digest("hex");
    return hashedData;
  };
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);

  return (
    <>
      {connectionStat ? (
        <main className="container mx-auto h-screen">
          <div className="flex flex-col grid-cols-2 items-center">
            <h1 className="text-xl font-bold">
              <TypeWriterOnce text="Register to the Program" />
            </h1>
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Enter apprentice name..."
                value={apprenticeName}
                onChange={(e) => setApprenticeName(e.target.value)}
              />
            </Grow>
            <Fade in={true} timeout={2000}>
              <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Enter address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Fade>

            <Fade in={true} timeout={2000}>
              <Button onClick={handleSubmit} className="w-72 p-2 mt-4 button ">
                Register
              </Button>
            </Fade>
          </div>
        </main>
      ) : (
        <>Please connect your wallet</>
      )}
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
