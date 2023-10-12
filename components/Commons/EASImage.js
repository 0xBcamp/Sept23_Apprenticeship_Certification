import Image from "next/image";

export default ({ name, imageSrc, ImgWidth, ImgHeight }) => {
  return (
    <Image
      loader={() => imageSrc}
      src={imageSrc}
      alt={name}
      width={ImgWidth ? ImgWidth : "400"}
      height={ImgHeight ? ImgHeight : "400"}
    />
  );
};
