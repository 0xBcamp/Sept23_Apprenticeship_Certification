import ProfilePage from "@/components/ProfilePart/ProfilePage";
import Link from "next/link";
import { useMoralis } from "react-moralis";

export default () => {
  const { isWeb3Enabled } = useMoralis();

  return (
    <>
      {isWeb3Enabled ? (
        <>
          <ProfilePage />
        </>
      ) : (
        <>Please connect your wallet</>
      )}
    </>
  );
};
