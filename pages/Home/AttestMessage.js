import AttestMessageCard from "/components/Cards/AttestMessageCard";
import Link from "next/link";
import GreetingLottie from "/components/DisplayLottie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  useEffect(() => {
    const { id } = router.query;
    const checkURL = async () => {
      if (id) {
        setAddress(id);
      }
    };
    checkURL();
  }, [router.query.id]);
  return (
    <>
      <Link href={"/Home/Attestations"} className="Link__Back">
        Back
      </Link>
      <div className="container h-screen">
        <main className="flex flex-col gap-3 justify-center items-center">
          <div className="grid grid-cols-2">
            <div
              className="flex flex-col grid-cols-1 items-center"
              style={{ width: "100%" }}
            >
              <GreetingLottie animationPath="/lottie/Attesting.json" />
            </div>
            <div>
              <AttestMessageCard addressFromProfile={address} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
