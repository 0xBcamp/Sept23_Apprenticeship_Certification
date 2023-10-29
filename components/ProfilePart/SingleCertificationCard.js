import { useEffect, useState } from "react";
import {
  EASDate,
  EASSlicedAddress,
  EASMessage,
  EASImage,
} from "@/components/Commons";
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
  return (
    <>
      <Fade bottom duration={2000}>
        <div className="card card-body text-white">
          <div className="flex text-center justify-around space-x-2">
            {/* <div>
            <ENSAvatar address={attester} size={50} />
          </div> */}
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
      </Fade>
    </>
  );
};
