import { Skeleton } from "web3uikit";

export default () => {
  return (
    <div className="space-x-2 Skeleton__Card flex">
      <Skeleton theme="image" width="300px" height="300px" />
    </div>
  );
};
