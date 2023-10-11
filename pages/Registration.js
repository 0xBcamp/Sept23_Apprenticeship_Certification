import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Dropdown } from "web3uikit";
import Link from "next/link";

export default () => {
  const { isWeb3Enabled, account } = useMoralis();

  const [certType, setCertType] = useState("1");

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const hideRegistrationModal = () => setShowRegistrationModal(false);

  const handleClick = () => {
    setShowRegistrationModal(!showRegistrationModal);
  };

  return (
    <>
      {isWeb3Enabled ? (
        <>
          <Link href={"/Home"} className="Link__Back">
            Back
          </Link>
          <div className="container mx-auto h-56 grid grid-cols-1 gap-2 ">
            <h1 className="H1__Header">Certificate Registration</h1>
            {/* {showRegistrationModal && (
              <RegistrationModal account={account} onClose={hideRegistrationModal} />
            )} */}
            <div className="m-2">
              <input
                className="w-72 p-2 mt-4 Primary__Text"
                type="text"
                disabled={true}
                value={account}
              />
            </div>

            <div className="m-2">
              <Dropdown
                defaultOptionIndex={0}
                label="Certification Type: "
                onChange={(e) => {
                  setCertType(e.id);
                  console.log(e);
                }}
                options={[
                  {
                    id: "1",
                    label: "Internship",
                  },
                  {
                    id: "2",
                    label: "Apprenticeship",
                  },
                  {
                    id: "3",
                    label: "Scholarship",
                  },
                ]}
              />
            </div>

            <div>
              <Link className="Primary__Click" onClick={handleClick} href="#">
                Register
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div>Please connect your wallet</div>
      )}
    </>
  );
};

/*
{
  "type": ${internshipCompletion},
  "participantAddress": ${ethereumAddress},
  "internship": ${internshipProvider},
  "startDate": ${date},
  "endDate": ${date},
  "mentorAddress": ${ethereumAddress},
  "status": ${completed/in-progress/failed},
  "hash": ${hashOfTheAboveDetails}
}
*/
