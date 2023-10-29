"use client";
import { db } from "@/Constants/Context/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "@/components/Commons";
import hash from "hash.js";
import {
  Button,
  Fade,
  FormControl,
  Grow,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ErrorModal from "../Modals/ErrorModal";
import SuccessModal from "../Modals/SuccessModal";
import WaitModal from "../Modals/WaitModal";
import DisplayLottie from "../DisplayLottie";

export default () => {
  const { isConnected, address: apprAddress } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const [apprenticeName, setApprenticeName] = useState("");
  const [address, setAddress] = useState("");
  const [newID, setNewID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWait, setShowWait] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!apprenticeName) {
      alert("Please enter a apprenticeName!");
      return;
    }

    setIsLoading(false);
    setOpenError(false);
    try {
      setIsLoading(true);
      setShowWait(true);

      const std = await addDoc(collection(db, "Students"), {
        Name: apprenticeName,
        Address: apprAddress,
        Program: selectedProgram,
        Hash: handleHash(apprAddress),
      });
      setNewID(std.id);
      console.log(std.id);
      // alert("Done!!");
      setShowWait(false);
      setIsLoading(false);
      setOpenSuccess(true);
      setApprenticeName("");
      setAddress("");
    } catch (error) {
      console.error("Erorr", error);
    } finally {
      setIsLoading(false);
      setShowWait(false);
      // setOpenError(false);
    }
  };
  const handleFetch = async () => {
    const query = await getDocs(collection(db, "Programs"));
    const data = [];
    query.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    // if (a.id == "01") {
    const aa = [];
    for (let a of data) {
      aa.push(a.Name);
      console.log(a.Name);
    }
    setdataArray(data);
    // }
  };

  const handleHash = (data) => {
    const hashedData = hash.sha256().update(data).digest("hex");
    return hashedData;
  };
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);

  const [selectedProgram, setSelectedProgram] = useState("");
  const [dataArray, setdataArray] = useState([]);
  useEffect(() => {
    handleFetch();
  }, []);
  const handleChange = (event) => {
    setSelectedProgram(event.target.value);
  };

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
            {/* <Fade in={true} timeout={2000}>
              <Input
                className="text-white w-72 p-2 mt-4"
                type="text"
                placeholder="Enter address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Fade> */}

            <Fade in={true} timeout={2000}>
              <FormControl fullWidth>
                <InputLabel>Select a Program</InputLabel>
                <Select
                  value={selectedProgram}
                  label="selectedProgram"
                  onChange={handleChange}
                >
                  {dataArray.map((item) => {
                    return <MenuItem value={item.id}>{item.Name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Fade>
            <Fade in={true} timeout={2000}>
              <Button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-72 p-2 mt-4 button "
              >
                <div>
                  {isLoading ? (
                    <DisplayLottie
                      width={"100%"}
                      animationPath="/lottie/LoadingBlue.json"
                    />
                  ) : (
                    <p>Register</p>
                  )}
                </div>
              </Button>
            </Fade>
            <Fade in={true} timeout={2000}>
              <Button onClick={handleFetch} className="w-72 p-2 mt-4 button ">
                Fetch
              </Button>
            </Fade>
          </div>
          {showWait && <WaitModal open={showWait} onClose={showWait} />}
          {openError && (
            <ErrorModal
              message={errorMessage}
              open={openError}
              onClose={() => setOpenError(false)}
            />
          )}
          {newID && (
            <SuccessModal
              message={newID}
              open={false}
              onClose={() => setOpenSuccess(false)}
            />
          )}
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
