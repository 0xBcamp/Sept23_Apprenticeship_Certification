import { useEffect, useState } from "react";
import { EASDate, EASSlicedAddress, EASMessage } from "/components/Commons";
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
        <div className="bg-slate-900 text-white my-1 py-2 px-4 rounded-xl border border-gray-900">
          <div className="flex text-center justify-between ">
            <div>
              <img src={logo} alt="" className="w-14 h-14" />
            </div>

            <div>
              <EASSlicedAddress Address={attester} />
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
