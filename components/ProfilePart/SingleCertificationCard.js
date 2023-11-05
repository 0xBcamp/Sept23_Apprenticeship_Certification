import { useContext, useEffect, useState } from "react";
import {
  EASDate,
  EASSlicedAddress,
  EASMessage,
  EasEnsAvatar,
} from "/components/Commons";
import { AddressToBNS } from "/utils/contractUtils";

import { Fade } from "react-awesome-reveal";
import { ContractContext } from "../../Constants/Context/ContractContext";
import { useAccount } from "wagmi";

export default ({ item }) => {
  const { decodedDataJson, attester, timeCreated, txid, id } = item;
  const [decodedDataJsonArr, setDecodedDataJsonArr] = useState([]);
  const [certName, setCertName] = useState("");
  const [BNSName, setBnsName] = useState("");

  const { addressFromSearchbar } = useContext(ContractContext);
  const { address } = useAccount();
  const getBNSName = async () => {
    const bnsName = await AddressToBNS(attester);
    setBnsName(bnsName);
  };
  useEffect(() => {
    try {
      const jsonArray = JSON.parse(decodedDataJson);
      setDecodedDataJsonArr(jsonArray);
      for (let i of jsonArray) {
        if (i.value.name.toLowerCase() == "certificatename")
          setCertName(i.value.value);
      }
      getBNSName();
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [decodedDataJson]);

  const logo = "/logo2.png";

  const organizationName = certName + " Certification"; // Replace with the actual organization name the user entered

  const easAttestationUrl = id; // Replace with the actual EAS attestation URL that is output upon transaction completion

  const easAttestationUrlToEASScan = `https://sepolia.easscan.org/attestation/view/${id}`; // Replace with the actual EAS attestation URL that is output upon transaction completion

  const transactionHash = txid; // Replace with the actual transaction hash that is output upon transaction completion

  const transactionHashToEtherscan = `https://sepolia.etherscan.io/tx/${txid}`; // Replace with the actual transaction hash that is output upon transaction completion

  const handleCertificationClick = () => {
    const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${organizationName}&organizationName=${organizationName}&certId=${easAttestationUrl}&certUrl=${transactionHashToEtherscan}`;

    window.open(linkedinUrl, "_blank");
  };

  const handleClickNav = () => {
    const easAttestationUrlToEASScan = `https://sepolia.easscan.org/attestation/view/${id}`; // Replace with the actual EAS attestation URL that is output upon transaction completion
    window.open(easAttestationUrlToEASScan, "_blank");
  };
  return (
    <>
      <Fade bottom duration={2000}>
        <div className="flex items-center gap-2 justify-between w-full">
          <div
            className="cursor-pointer w-full bg-slate-900 text-white my-1 py-2 px-4 rounded-xl border border-gray-900"
            onClick={handleClickNav}
          >
            <div className="flex text-center justify-between space-x-2">
              <div>
                <EasEnsAvatar address={attester} size={50} />
              </div>
              <div>
                {BNSName ? BNSName : <EASSlicedAddress Address={attester} />}
                <EASDate date={timeCreated} />
              </div>
              <div>
                <p>
                  {decodedDataJsonArr.map((item, i) => {
                    return (
                      <>
                        <EASMessage
                          key={i}
                          Message={
                            item.value.name.toLowerCase() == "name" &&
                            item.value.value
                          }
                        />
                        <EASMessage
                          key={i}
                          Message={
                            item.value.name.toLowerCase() ==
                              "certificatename" && item.value.value
                          }
                        />
                      </>
                    );
                  })}
                </p>
              </div>
            </div>
          </div>
          {address == addressFromSearchbar && (
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/3 py-4 px-2 border border-blue-700 rounded"
              onClick={handleCertificationClick}
            >
              LinkedIn
            </button>
          )}
        </div>
      </Fade>
    </>
  );
};
