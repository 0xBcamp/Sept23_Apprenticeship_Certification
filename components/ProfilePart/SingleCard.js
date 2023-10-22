import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useEffect, useState } from "react";
// import { Card, ENSAvatar } from "web3uikit";
import {
  EASDate,
  EASSlicedAddress,
  EASMessage,
  EASImage,
} from "@/components/Commons";

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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div className="flex text-center justify-around space-x-1">
            {/* <div>
            <ENSAvatar address={attester} size={50} />
          </div> */}
            <EASImage imageSrc={logo} ImgWidth={50} />
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
        </CardContent>
      </Card>
    </>
  );
};
