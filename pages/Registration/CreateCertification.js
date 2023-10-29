import { useState } from "react";
import GeneratePNGCard from "../../components/Cards/GeneratePNGCard";

export default () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  // const [show, setShow] = useState(false);
  return (
    <div className="text-black">
      <input
        type="text"
        placeholder="enter local image path..."
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="enter name..."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="text"
        placeholder="enter city..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <input
        type="text"
        placeholder="enter address..."
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      {/* <Button onClick={() => setShow(!show)}>nnn</Button> */}
      <GeneratePNGCard logo={image} name={name} city={city} address={address} />
    </div>
  );
};
