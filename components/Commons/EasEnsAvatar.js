import Blockies from "react-blockies";
export default ({ address, size }) => {
  return (
    <div>
      <Blockies seed={address} size={size} scale={1} className="rounded-full" />
    </div>
  );
};
