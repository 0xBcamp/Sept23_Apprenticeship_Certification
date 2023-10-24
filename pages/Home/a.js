import Link from "next/link";
import { TypeWriter } from "@/components/Commons";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <p className="text-2xl font-bold"> Welcome to</p>
      <header className="text-6xl font-bold mb-4 text-center">
        <TypeWriter text="BlockBadge" speed="100" restartDelay={2000} />
      </header>
      <p className="text-lg mb-6 text-center flex-wrap">
        BlockBadge Platform is a cutting-edge blockchain-based system designed
        to revolutionize the way credentials and certifications are managed and
        verified. It provides a secure, transparent, and tamper-proof
        infrastructure for individuals and organizations to issue, store, and
        validate digital badges, certificates, and credentials.
      </p>
      <div className="space-x-2">
        <Link href="/Home" className="Primary__Click">
          Get Started
        </Link>
        <Link href="/Registration/" className="Primary__Click">
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
