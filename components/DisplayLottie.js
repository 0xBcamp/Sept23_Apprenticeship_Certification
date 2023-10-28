import Lottie from "lottie-react";

export default ({ animationPath, width = "75%", looping = true }) => {
  return (
    <div onClick={() => null}>
      <Lottie path={animationPath} loop={looping} style={{ width: width }} />
    </div>
  );
};
