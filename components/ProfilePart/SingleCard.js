import { useEffect, useState } from "react";
import { Card, ENSAvatar } from "web3uikit";
import { EASDate, EASSlicedAddress, EASMessage } from "@/components/Commons";

export default ({ item }) => {
  const { decodedDataJson, attester, timeCreated } = item;
  // console.log(decodedDataJson);
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
  return (
    <>
      <Card style={{ padding: "10px", border: "1px solid #ddd" }}>
        <div className="flex grid-cols-3 text-center space-x-1">
          <div>
            <ENSAvatar address={attester} size={50} />
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
                    Message={item.value.name == "message" && item.value.value}
                  />
                );
              })}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};
