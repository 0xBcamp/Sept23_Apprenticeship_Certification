"use client";
import { db } from "@/Context/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "@/components/Commons";
import hash from "hash.js";
import { Button, Fade, Grow, Input } from "@mui/material";
import UploadFileModal from "../Modals/UploadFileModal";

export default () => {
  const { isConnected, address: apprAddress } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);

  const [Name, setName] = useState("");
  // const [Type, setType] = useState("");
  const [ImageURL, setImageURL] = useState("");
  const [Description, setDescription] = useState("");

  const stdRef = collection(db, "Programs");

  const handleSubmit = async () => {
    // if (!address) {
    //   alert("Please enter an address!");
    //   return;
    // }
    // if (!apprenticeName) {
    //   alert("Please enter a apprenticeName!");
    //   return;
    // }

    try {
      const std = await addDoc(stdRef, {
        Name: Name,
        // Type: Type,
        ImageURL: ImageURL,
        Description: Description,

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
    for (let a of data)
      if (a.id == "01") {
        // setStatus(a.Status);
        console.log(a.Status);
      }
  };

  const handleHash = (data) => {
    const hashedData = hash.sha256().update(data).digest("hex");
    return hashedData;
  };
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);

  const [fileName, setFileName] = useState("");
  console.log(fileName);
  return (
    <>
      {connectionStat ? (
        <main className="container mx-auto h-full">
          <h1 className="text-xl font-bold">
            <TypeWriterOnce text="Add new Program" />
          </h1>
          <div className="flex flex-col grid-cols-2 items-center">
            <div>
              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000}
              >
                <Input
                  className="text-white w-72 p-2 mt-4"
                  type="text"
                  placeholder="Enter Name..."
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grow>

              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000}
              >
                <Input
                  className="text-white w-72 p-2 mt-4"
                  type="text"
                  placeholder="Enter ImageURL..."
                  value={fileName}
                  onChange={(e) => setImageURL(e.target.value)}
                />
              </Grow>
              <UploadFileModal file={(file) => setFileName(file)} />
            </div>
            <div>
              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000}
              >
                <textarea
                  className="text-white bg-transparent w-auto p-2 mt-4"
                  type=""
                  placeholder="Enter Description..."
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grow>
            </div>
            <div>
              <Fade in={true} timeout={2000}>
                <Button
                  onClick={handleSubmit}
                  className="w-72 p-2 mt-4 button "
                >
                  Register
                </Button>
              </Fade>
              <Fade in={true} timeout={2000}>
                <Button onClick={handleFetch} className="w-72 p-2 mt-4 button ">
                  handleFetch
                </Button>
              </Fade>
            </div>
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
