// import React, { useRef, useState } from "react";
// import html2canvas from "html2canvas";

// function ImageGenerator() {
//   const captureRef = useRef();
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Default background color

//   const handleCapture = () => {
//     html2canvas(captureRef.current, { backgroundColor }).then((canvas) => {
//       const image = canvas.toDataURL("image/png");
//       setCapturedImage(image);
//       const a = document.createElement("a");
//       a.href = image;
//       a.download = "generated-image.png";
//       a.style.display = "none";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     });
//   };

//   const changeBackgroundColor = (color) => {
//     setBackgroundColor(color);
//   };

//   const colorOptions = ["#ffffff", "#f2f2f2", "#b0e0e6", "#90ee90", "#ffc0cb"];

//   return (
//     <div>
//       <div ref={captureRef} style={{ backgroundColor }}>
//         <h1>Name: John Doe</h1>
//         <p>City: New York</p>
//         <p>Address: 123 Main St, Apt 4B</p>
//       </div>
//       <div>
//         <h2>Background Color Palette:</h2>
//         {colorOptions.map((color, index) => (
//           <button
//             key={index}
//             style={{ backgroundColor: color }}
//             onClick={() => changeBackgroundColor(color)}
//           >
//             {color === backgroundColor ? "Selected" : "Select"}
//           </button>
//         ))}
//       </div>
//       <button onClick={handleCapture}>Generate and Download Image</button>

//       {capturedImage && (
//         <div>
//           <h2>Captured Image:</h2>
//           <img src={capturedImage} alt="Generated Image" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageGenerator;

import React, { useRef, useState } from "react";

import html2canvas from "html2canvas";

export default ({ logo, name, city, address }) => {
  const captureRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = () => {
    html2canvas(captureRef.current).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      setCapturedImage(image); // Save the captured image to the state
      const a = document.createElement("a");
      a.href = image;
      a.download = "generated-image.png";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div>
      <div
        className="border-2 p-4 card bg-gradient-to-bl from-indigo-900"
        style={{ width: "400px", backgroundColor: "#2E2E48" }}
        ref={captureRef}
      >
        <img src={logo} alt="" width={40} />
        <h1>Name: {name}</h1>
        <p className="text-white">City: {city}</p>
        <p className="text-white">Address: {address}</p>
      </div>
      <button onClick={handleCapture}>Generate and Download Image</button>

      {capturedImage && (
        <div>
          <h2>Captured Image:</h2>
          <img src={capturedImage} alt="Generated Image" />
        </div>
      )}
    </div>
  );
};

// // import React, { useRef } from "react";
// // import html2canvas from "html2canvas";

// // export default ({ logo, name, city, address }) => {
// //   const captureRef = useRef();

// //   const handleCapture = () => {
// //     html2canvas(captureRef.current).then((canvas) => {
// //       const image = canvas.toDataURL("image/png");
// //       const a = document.createElement("a");
// //       a.href = image;
// //       console.log(image);
// //       a.download = "generated-image.png";
// //       a.style.display = "none";
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //     });
// //   };

// //   return (
// //     <div>
// //       <div
// //         className="border-2 p-4 card bg-gradient-to-bl from-indigo-900"
// //         style={{ width: "400px", backgroundColor: "#2E2E48" }}
// //         ref={captureRef}
// //       >
// //         <img src={logo} alt="" width={40} />
// //         <h1>Name: {name}</h1>
// //         <p className="text-white">City: {city}</p>
// //         <p className="text-white">Address: {address}</p>
// //       </div>
// //       <button onClick={handleCapture}>Generate and Download Image</button>
// //     </div>
// //   );
// // };

// // import React from "react";

// // class SVGGenerator extends React.Component {
// //   generateSVG = () => {
// //     const svgText = `
// //       <svg width="2000" height="100" xmlns="http://www.w3.org/2000/svg">
// //         <text x="10" y="40" font-family="Arial" font-size="20" fill="black">Your Text Here</text>
// //       </svg>
// //     `;

// //     const blob = new Blob([svgText], { type: "image/svg+xml" });
// //     const url = URL.createObjectURL(blob);

// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "generated.svg";
// //     a.style.display = "none";
// //     document.body.appendChild(a);
// //     a.click();
// //     document.body.removeChild(a);
// //     URL.revokeObjectURL(url);
// //   };

// //   render() {
// //     return (
// //       <div>
// //         <button onClick={this.generateSVG}>Generate and Download SVG</button>
// //       </div>
// //     );
// //   }
// // }

// // export default SVGGenerator;
