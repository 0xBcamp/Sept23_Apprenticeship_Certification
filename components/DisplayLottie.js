import Lottie from "lottie-react";

export default ({ animationPath }) => {
  return (
    <div onClick={() => null}>
      <Lottie path={animationPath} loop={true} style={{ width: "75%" }} />
    </div>
  );
};
