<<<<<<< HEAD
import Link from "next/link";

export default () => {
  return (
    <>
      <Link href={"/Home"} className="Link__Back">
        Back
      </Link>
      <div className="container mx-auto">
        <h1 className="H1__Header">Attest a Certification</h1>
        <p className="m-2">Attest new Apprentice</p>
        <div className="m-2">
          <Link href="/Home/AttestCertification" className="Primary__Click">
            Attest now
          </Link>
        </div>
        <br />
        <hr />
        <h1 className="H1__Header">Attetst a Meesage (feedback)</h1>
        <p className="m-2">What is your evaluation of this apprentice?</p>
        <div className="m-2">
          <Link href="/Home/AttestMessage" className="Primary__Click">
            Attest now
          </Link>
        </div>
        <br />
        <hr />
      </div>
    </>
  );
};
=======
import Link from "next/link";

export default () => {
  return (
    <>
      <Link href={"/Home"} className="Link__Back">
        Back
      </Link>
      <div className="container mx-auto">
        <h1 className="H1__Header">Attest a Certification</h1>
        <p className="m-2">Attest new Apprentice</p>
        <div className="m-2">
          <Link href="/Home/AttestCertification" className="Primary__Click">
            Attest now
          </Link>
        </div>
        <br />
        <hr />
        <h1 className="H1__Header">Attetst a Meesage (feedback)</h1>
        <p className="m-2">What is your evaluation of this apprentice?</p>
        <div className="m-2">
          <Link href="/Home/AttestMessage" className="Primary__Click">
            Attest now
          </Link>
        </div>
        <br />
        <hr />
      </div>
    </>
  );
};
>>>>>>> origin/alfaqi
