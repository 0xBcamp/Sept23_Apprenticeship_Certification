import Lottie from "lottie-react";

const GreetingLottie = ({ animationPath }) => {
  return (
    <div onClick={() => null}>
      <Lottie path={animationPath} loop={true} />
    </div>
  );
};

export default GreetingLottie;
