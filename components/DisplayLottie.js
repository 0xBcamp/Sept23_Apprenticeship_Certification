import Lottie from "lottie-react";

export default ({ animationPath, looping = true }) => {
  return (
    <div onClick={() => null}>
      <Lottie path={animationPath} loop={looping} />
    </div>
  );
};
