import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TypeWriterOnce } from "../Commons";
import {
  Button,
  FormControl,
  Grow,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import SuccessModal from "../Modals/SuccessModal";
import ErrorModal from "../Modals/ErrorModal";
import DisplayLottie from "../DisplayLottie";
import WaitModal from "../Modals/WaitModal";

import ViewModal from "../Modals/ViewModal";
import { createOrganizationResolverContract } from "../../utils/contractUtils";
import { People, Save } from "@mui/icons-material";
export default () => {
  const { isConnected } = useAccount();
  const [action, setAction] = useState("add");

  const [connectionStat, setConnectionStat] = useState(false);

  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const handleErrors = (error, message) => {
    setErrorMessage(message);
    setOpenError(true);
    console.log(error);
    console.log(message);
    if (!error) return;

    if (error.message.toLowerCase().includes("user rejected")) {
      setErrorMessage(
        "MetaMask Tx Signature: User denied transaction signature"
      );
    } else if (
      error.message
        .toLowerCase()
        .includes("must provide at least one member address")
    ) {
      setErrorMessage("Must provide at least one member address");
    } else if (
      error.message.toLowerCase().includes("duplicate member address provided")
    ) {
      setErrorMessage("Duplicate member address provided");
    } else if (
      error.message
        .toLowerCase()
        .includes("only the owner can call this function")
    ) {
      setErrorMessage("Only the owner can call this function");
    } else if (
      error.message
        .toLowerCase()
        .includes("not listed, please whitelist the address")
    ) {
      setErrorMessage("Not listed, please whitelist the address");
    } else if (
      error.message.toLowerCase().includes("address is already a member")
    ) {
      setErrorMessage("Address is already a member");
    } else if (
      error.message.toLowerCase().includes("address is not a member")
    ) {
      setErrorMessage("Address is not a member");
    } else if (
      error.message.toLowerCase().includes("cannot add zero address")
    ) {
      setErrorMessage("Cannot add zero address");
    } else {
      setErrorMessage("Error occurred while processing.");
    }
  };

  const handleConfirm = async () => {
    if (!address) {
      handleErrors("", "Please enter the address");
      return;
    }

    try {
      const contract = await createOrganizationResolverContract();
      let member;

      setIsLoading(true);

      if (action == "add") {
        member = await contract.addToMembers(address);
      } else if (action == "remove") {
        member = await contract.removeFromMembers(address);
      }

      setShowWait(true);
      await member.wait();
      setShowWait(false);
      setIsLoading(false);
      setOpenSuccess(true);
      setAddress("");
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
      setShowWait(false);
    }
  };

  const [allMembers, setAllMembers] = useState([]);
  const handleGetAllMembers = async () => {
    try {
      const contract = await createOrganizationResolverContract();

      const allMembers = await contract.getAllMembers();
      if (!allMembers) return;
      setAllMembers(allMembers);
    } catch (error) {
      handleErrors(error);
    }
    setViewModal(true);
  };

  const handleChange = (event) => {
    if (event.target.value == "add") setAction("add");
    else setAction("remove");
    console.log(action);
  };
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);
  return (
    <>
      {connectionStat ? (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <div className="container h-screen">
            <div className="flex flex-col grid-cols-2 items-center">
              <h1 className="text-xl font-bold">
                <TypeWriterOnce text="Mentors Management" />
              </h1>

              <Input
                className="text-white w-80 p-2 mt-4"
                type="text"
                placeholder="Enter the mentor address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <FormControl fullWidth className="w-72 p-2 mt-4">
                <InputLabel className="text-white">
                  Add / Remove Address
                </InputLabel>
                <Select
                  className="text-white"
                  value={action}
                  label="action"
                  onChange={handleChange}
                >
                  <MenuItem value={"add"}>Add</MenuItem>
                  <MenuItem value={"remove"}>Remove</MenuItem>
                </Select>
              </FormControl>

              {/* <Button
                disabled={isLoading}
                onClick={handleConfirm}
                className="w-72 p-2 mt-4 button "
              >
                <div>
                  {isLoading ? (
                    <DisplayLottie
                      width={"100%"}
                      animationPath="/lottie/LoadingBlue.json"
                    />
                  ) : (
                    <p className="text-indigo-400">Confirm</p>
                  )}
                </div>
              </Button> */}
              <div className="flex gap-2">
                <Tooltip title="Confirm">
                  <button
                    className="mt-4 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                    onClick={handleConfirm}
                    disabled={isLoading}
                  >
                    <div>
                      {isLoading ? (
                        <DisplayLottie
                          width={"100%"}
                          animationPath="/lottie/LoadingBlue.json"
                        />
                      ) : (
                        <Save color="info" />
                      )}
                    </div>
                  </button>
                </Tooltip>
                {/* <Button
                onClick={handleGetAllMembers}
                className="w-72 p-2 mt-4 button "
              >
                <p className="text-indigo-400">All members</p>
              </Button> */}
                <Tooltip title="All members">
                  <button
                    className="mt-4 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                    onClick={handleGetAllMembers}
                    disabled={isLoading}
                  >
                    <div>
                      {isLoading ? (
                        <DisplayLottie
                          width={"100%"}
                          animationPath="/lottie/LoadingBlue.json"
                        />
                      ) : (
                        <People color="info" />
                      )}
                    </div>
                  </button>
                </Tooltip>
              </div>
              {viewModal && (
                <ViewModal
                  members={allMembers}
                  open={viewModal}
                  onClose={() => setViewModal(false)}
                />
              )}
              {openError && (
                <ErrorModal
                  message={errorMessage}
                  open={openError}
                  onClose={() => setOpenError(false)}
                />
              )}
              {openSuccess && (
                <SuccessModal
                  open={false}
                  onClose={() => setOpenSuccess(false)}
                />
              )}
              {showWait && <WaitModal open={showWait} onClose={showWait} />}
            </div>
          </div>
        </Grow>
      ) : (
        <>Please connect your wallet</>
      )}
    </>
  );
};
