<<<<<<< HEAD
import { useEffect } from "react";
import { Card, ENSAvatar } from "web3uikit";
import { useMoralis } from "react-moralis";
import { EASSlicedAddress } from "@/components/Commons";
import Link from "next/link";
export default () => {
  const { account } = useMoralis();

  useEffect(() => {}, [account]);
  return (
    <Card style={{ height: "100%" }}>
      <h1 className="text-2xl">My Account</h1>
      <div>
        <div className="border">
          <ENSAvatar address={account} size={100} />
        </div>
        <div>
          <EASSlicedAddress Address={account} />
        </div>
        <div>
          <Link
            href="/Home/Overall"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Overall
          </Link>
        </div>
        <div>
          <Link
            href="/Home/AllCert"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Certifications
          </Link>
        </div>
        <div>
          <Link
            href="/Home/AllRep"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Reputations
          </Link>
        </div>
      </div>
    </Card>
  );
};
=======
import { useEffect } from "react";
import { Card, ENSAvatar } from "web3uikit";
import { useMoralis } from "react-moralis";
import { EASSlicedAddress } from "@/components/Commons";
import Link from "next/link";
export default () => {
  const { account } = useMoralis();

  useEffect(() => {}, [account]);
  return (
    <Card style={{ height: "100%" }}>
      <h1 className="text-2xl">My Account</h1>
      <div>
        <div className="border">
          <ENSAvatar address={account} size={100} />
        </div>
        <div>
          <EASSlicedAddress Address={account} />
        </div>
        <div>
          <Link
            href="/Home/Overall"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Overall
          </Link>
        </div>
        <div>
          <Link
            href="/Home/AllCert"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Certifications
          </Link>
        </div>
        <div>
          <Link
            href="/Home/AllRep"
            className="Primary__Click"
            style={{ width: "100%" }}
          >
            Reputations
          </Link>
        </div>
      </div>
    </Card>
  );
};
>>>>>>> origin/alfaqi
