import { useContext, useEffect, useState } from "react";
import {
  EASDate,
  EASSlicedAddress,
  EASMessage,
  EASImage,
} from "/components/Commons";
import { Fade } from "react-awesome-reveal";
import { ContractContext } from "../../Constants/Context/ContractContext";

export default ({ item }) => {
  const { decodedDataJson, attester, timeCreated, txid, id } = item;
  const [decodedDataJsonArr, setDecodedDataJsonArr] = useState([]);
  const [certName, setCertName] = useState("");

  const { addressFromSearchbar } = useContext(ContractContext);

  useEffect(() => {
    try {
      const jsonArray = JSON.parse(decodedDataJson);
      setDecodedDataJsonArr(jsonArray);
      for (let i of jsonArray) {
        if (i.value.name.toLowerCase() == "certificatename")
          setCertName(i.value.value);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [decodedDataJson]);

  const logo = "/logo2.png";

  const organizationName = certName; // Replace with the actual organization name the user entered

  const easAttestationUrl = id; // Replace with the actual EAS attestation URL that is output upon transaction completion

  const easAttestationUrlToEASScan = `https://sepolia.easscan.org/attestation/view/${id}`; // Replace with the actual EAS attestation URL that is output upon transaction completion

  const organizationName = "orgname"; // Replace with the actual organization name the user entered

  const transactionHash = txid; // Replace with the actual transaction hash that is output upon transaction completion

  const transactionHashToEtherscan = `https://sepolia.etherscan.io/tx/${txid}`; // Replace with the actual transaction hash that is output upon transaction completion

  const handleCertificationClick = () => {
    const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${organizationName}&organizationName=${organizationName}&certId=${easAttestationUrl}&certUrl=${transactionHashToEtherscan}`;

    window.open(linkedinUrl, "_blank");
  };

  return (
    <>
      <Fade bottom duration={2000}>
        <div className="flex" style={{ width: "100%" }}>
          <div
            className="card card-body flex text-white"
            style={{ width: "75%" }}
          >
            <div className="flex text-center justify-between space-x-2">
              <div>
                <img src={logo} alt="" className="w-14 h-14" />
              </div>
              <div>
                <EASSlicedAddress Address={attester} />
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
          <div
            style={{ width: "25%", marginLeft: "10px" }}
            className="card card-body flex text-white"
          >
            <button onClick={handleCertificationClick}>
              Add Certification to My LinkedIn
            </button>
          </div>
        </div>
      </Fade>
    </>
  );
};
