"use client";
import { db } from "@/Context/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import StudentsRegisteration from "./StudentsRegisteration";
import AddProgram from "./AddProgram";
import DisplayLottie from "@/components/DisplayLottie";

export default () => {
  const { isConnected, address } = useAccount();

  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setLoading(true);
      const handleQuery = async () => {
        const stdRef = collection(db, "Students");
        const q = query(stdRef, where("Address", "==", address));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data().Address);
        });

        const accountData = [...new Set(data)];
        console.log(accountData);
        if (accountData.length > 0) {
          setRegistered(true);
        } else {
          setRegistered(false);
        }
        setLoading(false);
      };
      handleQuery();
    }
  }, [address]);
  if (loading) return <DisplayLottie animationPath="/lottie/waiting.json" />;

  if (registered)
    return (
      <div className="container mx-auto">
        You already registered to this program
        <AddProgram />
      </div>
    );
  if (!registered)
    return (
      <>
        <StudentsRegisteration />
      </>
    );
};
