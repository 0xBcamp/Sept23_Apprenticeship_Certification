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
import { Tooltip } from "@mui/material";

export default ({ item }) => {
  const { decodedDataJson, attester, timeCreated, txid, id } = item;
  const [decodedDataJsonArr, setDecodedDataJsonArr] = useState([]);
  const [certName, setCertName] = useState("");
  const [BNSName, setBnsName] = useState("");
  const [ipfshash, setipfshash] = useState("");
  const { addressFromSearchbar } = useContext(ContractContext);
  const { address } = useAccount();

  const getBNSName = async () => {
    const bnsName = await AddressToBNS(attester);
    setBnsName(bnsName);
  };

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [image, setImage] = useState("");

  const prefixIPFS = "ipfs://";

  const suffix = ".ipfs.w3s.link";

  useEffect(() => {
    const date = new Date(timeCreated * 1000); // Multiply by 1000 to convert seconds to milliseconds
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1); // Months are zero-indexed, so we add 1 to get the real month number
  }, [timeCreated]);

  useEffect(() => {
    try {
      const jsonArray = JSON.parse(decodedDataJson);
      setDecodedDataJsonArr(jsonArray);
      let modifiedURL;

      for (let i of jsonArray) {
        if (i.value.name.toLowerCase() == "certificatename")
          setCertName(i.value.value);
        if (i.value.name.toLowerCase() == "ipfshash") {
          setipfshash(i.value.value);
          modifiedURL = i.value.value.replace(prefixIPFS, "https://") + suffix;
        }
      }

      getBNSName();
      fetchDataFromIPFS(modifiedURL);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [decodedDataJson]);

  const fetchDataFromIPFS = async (ipfsURL) => {
    await fetch(ipfsURL)
      .then((response) => {
        if (!response) {
          throw new Error("Request failed!");
        }
        return response.json();
      })
      .then((data) => {
        const imageURL = data.image.replace(prefixIPFS, "https://") + suffix;
        setImage(imageURL);
      })
      .catch((err) => console.error(err));
  };

  // const logo = "/logo2.png";

  // const organizationName = certName + " Certification"; // Replace with the actual organization name the user entered

  const easAttestationUrl = id; // Replace with the actual EAS attestation URL that is output upon transaction completion

  // const easAttestationUrlToEASScan = `https://sepolia.easscan.org/attestation/view/${id}`; // Replace with the actual EAS attestation URL that is output upon transaction completion
  const easAttestationUrlToEASScan = `https://blockbadge.vercel.app/Profile/View?id%3D${id}`; // Replace with the actual EAS attestation URL that is output upon transaction completion

  // const transactionHash = txid; // Replace with the actual transaction hash that is output upon transaction completion

  // const transactionHashToEtherscan = `https://sepolia.etherscan.io/tx/${txid}`; // Replace with the actual transaction hash that is output upon transaction completion

  const handleCertificationClick = () => {
    // const linkedinUrll = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${organizationName}&organizationName=${organizationName}&certId=${easAttestationUrl}&certUrl=${easAttestationUrlToEASScan}`;
    const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationId=90410715&certId=${easAttestationUrl}&certUrl=${easAttestationUrlToEASScan}&isFromA2p=true&issueMonth=${month}&issueYear=${year}`;
    window.open(linkedinUrl, "_blank");
  };

  const handleClickNav = () => {
    const easAttestationUrlToEASScan = `https://blockbadge.vercel.app/Profile/View?id=${id}`; // Replace with the actual EAS attestation URL that is output upon transaction completion
    window.open(easAttestationUrlToEASScan, "_blank");
  };
  return (
    <>
      <Fade bottom duration={2000}>
        <div className="flex items-center gap-2 justify-between w-full">
          <Tooltip title={<img src={image} />}>
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
          </Tooltip>
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
