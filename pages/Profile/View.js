import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  BlockBadgeSBTAddress,
  createBlockBadgeSBTContract,
} from "../../utils/contractUtils";
import { ContractContext } from "../../Constants/Context/ContractContext";
import { useQuery } from "@apollo/client";

export default function View() {
  const router = useRouter();
  const { GET_ATTESTATION_QUERY } = useContext(ContractContext);

  const [url, setURL] = useState("");

  const [certification, setCertification] = useState("");
  const [cohortDate, setCohortDate] = useState("");
  const [cumulativeRate, setCumulativeRate] = useState("");
  const [ID, setID] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [projectName, setprojectName] = useState("");
  const [projectURL, setProjectURL] = useState("");

  const [ipfshash, setipfshash] = useState("");
  const [txToEtherscan, setTxToEtherscan] = useState("");

  const prefixIPFS = "ipfs://";

  const suffix = ".ipfs.w3s.link";

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;
    const originalURL = id;
    setURL(originalURL);
  }, [router.query.id]);

  const {
    loading,
    error,
    data: eas,
  } = useQuery(GET_ATTESTATION_QUERY, {
    variables: {
      id: url,
    },
  });

  useEffect(() => {
    try {
      setTxToEtherscan(eas.attestation.txid);

      const jsonArray = JSON.parse(eas.attestation.decodedDataJson);
      for (let i of jsonArray) {
        if (i.value.name.toLowerCase() == "ipfshash") {
          setipfshash(i.value.value);
        }
      }
      const modifiedURL = ipfshash.replace(prefixIPFS, "https://") + suffix;

      fetchDataFromIPFS(modifiedURL);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [eas]);

  const fetchDataFromIPFS = async (ipfsURL) => {
    await fetch(ipfsURL)
      .then((response) => {
        if (!response) {
          throw new Error("Request failed!");
        }
        return response.json();
      })
      .then((data) => {
        setCertification(data.certification);
        setCohortDate(data.cohortDate);
        setCumulativeRate(data.cumulativeRate);
        setID(data.id);
        const imageURL = data.image.replace(prefixIPFS, "https://") + suffix;
        setImage(imageURL);
        setName(data.name);
        setprojectName(data.projectName);
        setProjectURL(data.projectURL);
      })
      .catch((err) => console.error(err));
  };

  const openOpensea = () => {
    const link = `https://testnets.opensea.io/assets/sepolia/${BlockBadgeSBTAddress}/${ID}`;
    window.open(link, "_blank");
  };
  const openEASScan = () => {
    const link = `https://sepolia.easscan.org/attestation/view/${url}`;
    window.open(link, "_blank");
  };
  const openEtherscan = () => {
    const link = `https://sepolia.etherscan.io/tx/${txToEtherscan}`;
    window.open(link, "_blank");
  };
  return (
    <div className="container h-screen">
      <h1>Check the Certification</h1>
      {loading ? (
        <p>loading</p>
      ) : (
        <div className="items-center p-2 m-2">
          <div className="flex gap-2 p-2 m-2">
            <Button onClick={openOpensea}>View on Opensea</Button>
            <Button onClick={openEASScan}>View on EASScan</Button>
            <Button onClick={openEtherscan}>View on Etherscan</Button>
          </div>
          <img src={image} />
        </div>
      )}
    </div>
  );
}
