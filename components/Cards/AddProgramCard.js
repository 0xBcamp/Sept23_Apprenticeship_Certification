"use client";
import { db } from "@/Constants/Context/FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "@/components/Commons";
import hash from "hash.js";
import { Button, Fade, Grow, Input } from "@mui/material";
import UploadFileModal from "../Modals/IPFS/UploadFileModal";
import DisplayLottie from "../DisplayLottie";
import SuccessModal from "../Modals/SuccessModal";
import ErrorModal from "../Modals/ErrorModal";
import WaitModal from "../Modals/WaitModal";

export default () => {
  const { isConnected, address: apprAddress } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);
  const [newID, setNewID] = useState("");

  const [Name, setName] = useState("");
  // const [Type, setType] = useState("");
  const [ImageURL, setImageURL] = useState("");
  const [Description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showWait, setShowWait] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const stdRef = collection(db, "Programs");

  const handleSubmit = async () => {
    setIsLoading(false);
    setOpenError(false);
    try {
      setIsLoading(true);
      setShowWait(true);
      const std = await addDoc(stdRef, {
        Name: Name,
        // Type: Type,
        ImageURL: ImageURL,
        Description: Description,
        Mentor: apprAddress,

        Hash: handleHash(apprAddress),
      });
      setNewID(std.id);
      console.log(std.id);
      // alert("Done!!");
      setShowWait(false);
      setIsLoading(false);
      setOpenSuccess(true);

      setName("");
      setImageURL("");
      setDescription("");
    } catch (error) {
      console.error("Erorr", error);
    } finally {
      setIsLoading(false);
      setShowWait(false);
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
  return (
    <>
      {connectionStat ? (
        <main className="container mx-auto h-full">
          <h1 className="text-xl font-bold">
            <TypeWriterOnce text="Add new Program" />
          </h1>
          <div className="flex gap-2 grid-cols-2 items-center">
            <div>
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
                    value={ImageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </Grow>
              </div>
              <div className="p-2 mt-4">
                <UploadFileModal file={setImageURL} />
              </div>
              <div>
                <Grow
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  timeout={1000}
                >
                  <textarea
                    className="text-white border-black border-2 bg-transparent w-72 h-44 p-2 mt-4"
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
                        <p>Submit</p>
                      )}
                    </div>
                  </Button>
                </Fade>
                {/* <Fade in={true} timeout={2000}>
                  <Button
                    onClick={handleFetch}
                    className="w-72 p-2 mt-4 button "
                  >
                    handleFetch
                  </Button>
                </Fade> */}
              </div>
            </div>
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
              open={openSuccess}
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
