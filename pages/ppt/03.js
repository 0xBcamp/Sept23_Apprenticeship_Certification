import { TypeWriterOnce } from "@/components/Commons";
import { useState } from "react";
import NavBar from "./NavBar";

export default () => {
  const [nextLine, setNextLine] = useState(0);

  const typingSpeed = 1500;
  const speed = "50";

  if (nextLine < 10) {
    setTimeout(() => {
      setNextLine(nextLine + 1);
    }, typingSpeed);
  }

  return (
    <>
      <NavBar back="2" next="4" />
      <div className="container mx-auto">
        <header className="text-3xl font-bold mb-4 ">
          <TypeWriterOnce
            text="Here's an overview of the test cases:"
            speed={speed}
          />
        </header>
        <div className="text-xl font-bold m-4 ">
          <TypeWriterOnce text="Deployment:" speed={speed} />
        </div>
        <ul className="list-disc pl-4">
          {nextLine >= 2 && (
            <li>
              <TypeWriterOnce
                text={"It checks if the contract owner is set correctly."}
                speed={speed}
              />
            </li>
          )}
          {nextLine >= 3 && (
            <li>
              <TypeWriterOnce
                text={
                  "It verifies that the organization name is set correctly."
                }
                speed={speed}
              />
            </li>
          )}
          {nextLine >= 4 && (
            <li>
              <TypeWriterOnce
                text={"It ensures that the initial members are correctly set."}
                speed={speed}
              />
            </li>
          )}
        </ul>
        <div className="text-xl font-bold m-4 ">
          <TypeWriterOnce text="Manage Members:" speed={speed} />
        </div>

        <ul className="list-disc pl-4">
          {nextLine >= 5 && (
            <li>
              <TypeWriterOnce
                text={
                  "It verifies that the owner can add members to the organization."
                }
                speed={speed}
              />
            </li>
          )}
          {nextLine >= 6 && (
            <li>
              <TypeWriterOnce
                text={
                  "It checks if the owner can remove members from the organization."
                }
                speed={speed}
              />
            </li>
          )}
          {nextLine >= 7 && (
            <li>
              <TypeWriterOnce
                text={
                  "It tests whether non-owners are prevented from adding or removing members."
                }
                speed={speed}
              />
            </li>
          )}
        </ul>
        <div className="text-xl font-bold m-4 ">
          <TypeWriterOnce text="Check Membership:" speed={speed} />
        </div>
        <ul className="list-disc pl-4">
          {nextLine >= 8 && (
            <li>
              <TypeWriterOnce
                text={
                  "It checks if the function isOrganizationMember correctly returns true for members and false for non-members."
                }
                speed={speed}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
