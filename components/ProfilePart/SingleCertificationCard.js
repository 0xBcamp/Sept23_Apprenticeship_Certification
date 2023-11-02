import { useEffect, useState } from "react";
import {
  EASDate,
  EASSlicedAddress,
  EASMessage,
  EASImage,
} from "/components/Commons";
import { Fade } from "react-awesome-reveal";

export default ({ item }) => {
  const { decodedDataJson, attester, timeCreated } = item;
  const [decodedDataJsonArr, setDecodedDataJsonArr] = useState([]);
  useEffect(() => {
    try {
      const jsonArray = JSON.parse(decodedDataJson);
      setDecodedDataJsonArr(jsonArray);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [decodedDataJson]);

  const logo = "/logo2.png";

  const organizationName = "orgname"; // Replace with the actual organization name the user entered

  const easAttestationUrl = "easattestationurl"; // Replace with the actual EAS attestation URL that is output upon transaction completion

  const transactionHash = "transactionhash"; // Replace with the actual transaction hash that is output upon transaction completion

  const handleCertificationClick = () => {
    const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${organizationName}&organizationName=${organizationName}&certUrl=${easAttestationUrl}&certId=${transactionHash}`;
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
                <p>Attested</p>
                <p>
                  {decodedDataJsonArr.map((item, i) => {
                    return (
                      <EASMessage
                        key={i}
                        Message={
                          item.value.name.toLowerCase() == "message" &&
                          item.value.value
                        }
                      />
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
