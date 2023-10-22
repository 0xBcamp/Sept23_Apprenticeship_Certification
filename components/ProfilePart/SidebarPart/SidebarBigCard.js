import { useEffect, useState } from "react";
import { EASSlicedAddress } from "@/components/Commons";
import Link from "next/link";
import { ethers } from "ethers";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default () => {
  const [accountAddress, setAccountAddress] = useState("");
  useEffect(() => {
    const func = async () => {
      const a = new ethers.BrowserProvider(window.ethereum);
      const b = await a.getSigner();

      setAccountAddress(await b.getAddress());
      console.log(await b.getAddress());
    };
    func();
  }, []);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <h1 className="text-2xl">My Account</h1>

        <div>
          {/* <div className="border">
          <ENSAvatar address={accountAddress} size={100} />
        </div> */}
          <div>
            <EASSlicedAddress Address={accountAddress} />
          </div>
          <div>
            <Link
              href="/BBP/Overall"
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
      </CardContent>
    </Card>
  );
};
