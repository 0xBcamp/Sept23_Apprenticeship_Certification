import { useContext, useEffect, useState } from "react";
import { EASSlicedAddress, EasEnsAvatar } from "./Commons";
import { ContractContext } from "../Constants/Context/ContractContext";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export default ({ children }) => {
  const { addressFromSearchbar, bnsFromSearchbar } =
    useContext(ContractContext);
  const [account, setAccount] = useState("");
  const [copyImage, setCopyImage] = useState("/images/copy.svg");
  const { address } = useAccount();

  const copyAddress = async () => {
    await navigator.clipboard.writeText(addressFromSearchbar);
    setTimeout(function () {
      setCopyImage("/images/copy.svg");
    }, 2000);
    setCopyImage("/images/copySuccess.svg");
  };
  const router = useRouter();

  const handleAttestThisWallet = async () => {
    router.push(`/Home/AttestMessage?id=${addressFromSearchbar}`);
  };
  useEffect(() => {
    setAccount(addressFromSearchbar);
  }, [addressFromSearchbar]);

  return (
    <aside className="bigCard h-[80vh]">
      <nav className="h-full flex flex-col shadow-sm">
        <div className="bigCard border-b-black border-b-8 border-t-2 border-l-2 shadow-2xl p-4 pb-2 flex justify-between items-center">
          <div className="p-2">
            <EasEnsAvatar address={account} size={100} />
          </div>
          {bnsFromSearchbar && (
            <h1 className="text-xl font-bold">{bnsFromSearchbar}</h1>
          )}
          <div className="text-xl font-bold">
            <div className="flex gap-2" onClick={copyAddress}>
              <EASSlicedAddress Address={account} />
              <img src={copyImage} className="w-5" />
            </div>
          </div>
        </div>
        {/* <div className="p-4 pb-2 flex flex-col items-center">
          {/* <div className="border">
          <ENSAvatar address={accountAddress} size={100} />
        </div> 
        </div> */}

        <ul className="flex-1 px-3">{children}</ul>

        <div
          className="bigCard flex p-3 bg-gradient-to-bl from-indigo-900"
          style={{ backgroundColor: "#2E2E48" }}
        >
          <div className="flex justify-between items-center w-52 ml-3">
            <div className="leading-4">
              {address == account ? (
                <div className="h-16">
                  <h6 className="font-semibold">My Profile</h6>
                  <span className="text-xs text-gray-600">
                    Welcome to your Profile
                  </span>
                </div>
              ) : (
                <div>
                  <img src="/images/Vector.svg" alt="" className="w-10" />
                  <h6
                    onClick={handleAttestThisWallet}
                    className="font-semibold cursor-pointer"
                  >
                    Attest This Wallet
                  </h6>
                  <span className="text-xs text-gray-600">
                    Let others know you
                    <br /> know this person
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
