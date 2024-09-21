import { useEffect, useState } from "react";
import {
  EASDate,
  EASSlicedAddress,
  EASMessage,
  EasEnsAvatar,
} from "/components/Commons";
import { Fade } from "react-awesome-reveal";
import { AddressToBNS } from "/utils/contractUtils";

export default ({ item }) => {
  const { decodedDataJson, attester, timeCreated, id, txid } = item;
  const [decodedDataJsonArr, setDecodedDataJsonArr] = useState([]);
  const [BNSName, setBnsName] = useState("");
  const getBNSName = async () => {
    const bnsName = await AddressToBNS(attester);
    setBnsName(bnsName);
  };
  useEffect(() => {
    try {
      const jsonArray = JSON.parse(decodedDataJson);
      setDecodedDataJsonArr(jsonArray);
      getBNSName();
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [decodedDataJson]);
  const logo = "/logo2.png";

  const handleClickNav = () => {
    const easAttestationUrlToEASScan = `https://sepolia.easscan.org/attestation/view/${id}`; // Replace with the actual EAS attestation URL that is output upon transaction completion
    window.open(easAttestationUrlToEASScan, "_blank");
  };

  return (
    <>
      <Fade bottom duration={2000}>
        <div className="bg-slate-900 text-white my-1 py-2 px-4 rounded-xl border border-gray-900">
          <div
            className="flex text-center justify-between cursor-pointer"
            onClick={handleClickNav}
          >
            <div>
              <EasEnsAvatar address={attester} size={50} />
            </div>

            <div>
              {BNSName ? BNSName : <EASSlicedAddress Address={attester} />}
              <EASDate date={timeCreated} />
            </div>

            <div>
              <p>Attested</p>
              <p className="font-semibold">
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
      </Fade>
    </>
  );
};
