import { useRef, useState } from "react";

import html2canvas from "html2canvas";
const fileType = "image/png";
export default ({ logo = "/logo.png", name, certification }) => {
  const captureRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);

  const [capturedBlob, setCapturedBlob] = useState(null);

  function dataURLtoFile(dataURL, fileName) {
    const base64 = dataURL.split(",")[1];
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: fileType });

    return new File([blob], fileName, { type: fileType });
  }

  // Usage in handleCapture:
  const handleCapture = () => {
    html2canvas(captureRef.current).then((canvas) => {
      const image = canvas.toDataURL(fileType);
      setCapturedImage(image); // Save the captured image to the state

      // Create a File object from the Blob
      const file = dataURLtoFile(image, `${name + ".png"}`);

      // Set the File in the component's state
      setCapturedBlob(file);
    });
  };

  console.log(capturedBlob);

  console.log(captureRef.current);
  return (
    <div>
      <div
        className="border-2 p-4 card bg-gradient-to-bl from-indigo-900"
        style={{ width: "400px", backgroundColor: "#2E2E48" }}
        ref={captureRef}
      >
        <img src={logo} alt="" width={80} />
        <h2>Name: {name}</h2>
        <p className="text-white">Certification: {certification}</p>
      </div>
      <button onClick={handleCapture}>Generate Image</button>

      {/* {capturedImage && (
        <div>
          <h2>Captured Image:</h2>
          <img src={capturedImage} alt="Generated Image" />
        </div>
      )} */}
    </div>
  );
};
