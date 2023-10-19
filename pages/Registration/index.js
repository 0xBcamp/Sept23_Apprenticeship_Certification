import Link from "next/link";

export default () => {
  return (
    <div className="container mx-auto">
      <h1 className="H1__Header">Offchain Registration</h1>
      <p className="m-2">Offchain Registration</p>
      <div className="m-2">
        <Link
          href="/Registration/OffchainAttestation"
          className="Primary__Click"
        >
          Register now
        </Link>
      </div>
      <br />
      <hr />
      <h1 className="H1__Header">BlockSurvey Registration</h1>
      <p className="m-2">BlockSurvey Registration</p>
      <div className="m-2">
        <Link href="/Registration/BlockSurvey" className="Primary__Click">
          Register now
        </Link>
      </div>
      <br />
      <hr />
    </div>
  );
};
