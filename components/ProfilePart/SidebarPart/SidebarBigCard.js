import { EASSlicedAddress } from "@/components/Commons";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default () => {
  const { address } = useAccount();
  const [account, setAccount] = useState("");
  useEffect(() => {
    setAccount(address);
  }, [address]);
  return (
    <>
      <div>
        <div>
          <Link
            href="/BBP/Overview"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Overveiw
          </Link>
        </div>
        <div>
          <Link
            href="/BBP/AllCert"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Certifications
          </Link>
        </div>
        <div>
          <Link
            href="/BBP/AllRep"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Reputations
          </Link>
        </div>
      </div>
    </>
    //   </CardContent>
    // </Card>
  );
};
