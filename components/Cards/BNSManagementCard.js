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
} from "@mui/material";
import { ethers } from "ethers";
import SuccessModal from "../Modals/SuccessModal";
import ErrorModal from "../Modals/ErrorModal";
import DisplayLottie from "../DisplayLottie";
import WaitModal from "../Modals/WaitModal";
import { createBlockBadgeBNSContract } from "../../utils/contractUtils";

export default () => {
  const { isConnected, address: myAddress } = useAccount();

  const [connectionStat, setConnectionStat] = useState(false);

  const [recipientName, setRecipientName] = useState("");
  const [toAddress, setToAddress] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const isValidName = (name) => {
    const newName = name.toLocaleLowerCase().trim();
    const lastPart = ".blockbadge";
    return !newName.endsWith(lastPart);
  };

  const formatName = (name) => {
    const newName = name.toLocaleLowerCase().trim();
    const lastPart = ".blockbadge";
    let formatedName;
    if (!newName.endsWith(lastPart)) {
      formatedName = name + lastPart;
      return formatedName;
    } else {
      return name;
    }
  };

  const isOwnedName = async (name) => {
    const contract = await createBlockBadgeBNSContract();
    const formattedName = name + ".blockbadge";
    const resolveName = await contract.resolveName(formattedName);

    if (resolveName == "0x0000000000000000000000000000000000000000")
      return false; // Name is not owned
    else return true; // Name is already owned
  };

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
      error.message.toLowerCase().includes("bns name is already taken")
    ) {
      setErrorMessage("BNS name is already taken");
    } else if (
      error.message.toLowerCase().includes("you do not own this bns name")
    ) {
      setErrorMessage("You do not own this BNS name");
    } else if (
      error.message
        .toLowerCase()
        .includes("cannot transfer to the zero address")
    ) {
      setErrorMessage("Cannot transfer to the zero address");
    } else if (
      error.message.toLowerCase().includes("bns name cannot be empty")
    ) {
      setErrorMessage("BNS name cannot be empty");
    } else if (
      error.message.toLowerCase().includes("address is already a member")
    ) {
      setErrorMessage("Address is already a member");
    } else {
      setErrorMessage("Error occurred while processing.");
    }
  };

  const handleRegisterName = async () => {
    if (!recipientName) {
      handleErrors("", "Please enter the name!\nThe name is case sensitive");
      return;
    }

    try {
      const contract = await createBlockBadgeBNSContract();

      setIsLoading(true);

      const ownedBNSName = await contract.resolveAddress(myAddress);
      if (ownedBNSName) {
        handleErrors("", "You can't have more than one BNS Name.");
        return;
      }

      const validName = isValidName(recipientName);

      if (!validName) {
        handleErrors(
          "",
          "The provided name is invalid. Please select another name."
        );
        return;
      }

      const ownedName = await isOwnedName(recipientName);
      if (ownedName) {
        handleErrors("", "BNS name is already taken.");
        return;
      }

      const registedName = await contract.registerName(recipientName);

      setShowWait(true);
      await registedName.wait();
      setShowWait(false);
      setIsLoading(false);
      setOpenSuccess(true);
      setRecipientName("");
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
      setShowWait(false);
    }
  };

  const handleResolveAddress = async () => {
    const contract = await createBlockBadgeBNSContract();

    const resolveAddress = await contract.resolveAddress(myAddress);
    alert("Your BNS Name is: " + resolveAddress);
  };

  const handleTransferName = async () => {
    if (!recipientName) {
      handleErrors("", "Please enter the name!\nThe name is case sensitive");
      return;
    }
    if (!toAddress) {
      handleErrors("", "Please enter the address!");
      return;
    }

    try {
      const contract = await createBlockBadgeBNSContract();

      const ownedBNSName = await contract.resolveAddress(toAddress);
      if (ownedBNSName) {
        handleErrors("", "The recipient can't have more than one BNS Name.");
        return;
      }

      const validName = isValidName(recipientName);

      if (!validName) {
        handleErrors(
          "",
          "The provided name is invalid. Please select another name."
        );
        return;
      }

      const ownedName = await isOwnedName(recipientName);
      if (ownedName) {
        handleErrors("", "BNS name is already taken.");
        return;
      }

      setIsLoading(true);
      const formatedName = formatName(recipientName);

      const transferName = await contract.transferName(formatedName, toAddress);
      setShowWait(true);

      await transferName.wait();
      setShowWait(false);
      setIsLoading(false);
      setOpenSuccess(true);
      setRecipientName("");
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
      setShowWait(false);
    }
  };

  const [transfer, setTransfer] = useState("");

  const handleChange = (event) => {
    if (event.target.value == 1) setTransfer(true);
    else setTransfer(false);
  };
  useEffect(() => {
    setConnectionStat(isConnected);
  }, [isConnected]);
  return (
    <>
      {connectionStat ? (
        <div className="container h-screen">
          <div className="flex flex-col grid-cols-2 items-center">
            <h1 className="text-xl font-bold">
              <TypeWriterOnce text="BNS Management" />
            </h1>
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Input
                className="text-white w-80 p-2 mt-4"
                type="text"
                placeholder="Enter your name..."
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </Grow>

            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <FormControl fullWidth className="w-72 p-2 mt-4">
                <InputLabel className="text-white">Transfer Name</InputLabel>
                <Select
                  className="text-white"
                  value={transfer ? 1 : 2}
                  label="transfer"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={2}>No</MenuItem>
                </Select>
              </FormControl>
            </Grow>

            {transfer && (
              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000}
              >
                <Input
                  className="text-white w-80 p-2 mt-4"
                  type="text"
                  placeholder="transfer BNS name to new address..."
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                />
              </Grow>
            )}
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Button
                disabled={isLoading}
                onClick={handleRegisterName}
                className="w-72 p-2 mt-4 button "
              >
                <div>
                  {isLoading ? (
                    <DisplayLottie
                      width={"100%"}
                      animationPath="/lottie/LoadingBlue.json"
                    />
                  ) : (
                    <p className="text-indigo-400">Register</p>
                  )}
                </div>
              </Button>
            </Grow>
            <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
              <Button
                onClick={handleResolveAddress}
                className="w-72 p-2 mt-4 button "
              >
                <p className="text-indigo-400">What's my BNS Name</p>
              </Button>
            </Grow>
            {transfer && (
              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000}
              >
                <Button
                  disabled={isLoading}
                  onClick={handleTransferName}
                  className="w-72 p-2 mt-4 button "
                >
                  <div>
                    {isLoading ? (
                      <DisplayLottie
                        width={"100%"}
                        animationPath="/lottie/LoadingBlue.json"
                      />
                    ) : (
                      <p className="text-indigo-400">Transfer to new address</p>
                    )}
                  </div>
                </Button>
              </Grow>
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
      ) : (
        <>Please connect your wallet</>
      )}
    </>
  );
};
