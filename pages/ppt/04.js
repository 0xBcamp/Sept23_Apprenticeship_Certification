import { TypeWriterOnce } from "@/components/Commons";
import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import NavBar from "./NavBar";

export default () => {
  const speed = "10";

  const [code, setCode] = useState();

  const [currentIndex, setCurrentIndex] = useState(0);

  const codeText = `const { expect } = require("chai");
const { ethers } = require("hardhat");
  
  describe("OrganizationResolver", function () {
    let OrganizationResolver,
      organizationResolver,
      owner,
      addr1,
      addr2,
      addr3,
      IEAS;
  
    beforeEach(async function () {
      // Assuming you also have an IEAS mock or actual contract to deploy.
      IEAS = await ethers.getContractFactory("IEAS");
      const ieasInstance = await IEAS.deploy();
      await ieasInstance.deployed();
  
      OrganizationResolver = await ethers.getContractFactory(
        "OrganizationResolver"
      );
      [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
  
      // Deploying contract with initial members
      organizationResolver = await OrganizationResolver.deploy(
        ieasInstance.address,
        "TestOrganization",
        [addr1.address, addr2.address]
      );
      await organizationResolver.deployed();
    });
  
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        expect(await organizationResolver.owner()).to.equal(owner.address);
      });
  
      it("Should set the organization name correctly", async function () {
        expect(await organizationResolver.organizationName()).to.equal(
          "TestOrganization"
        );
      });
  
      it("Should have initial members correctly set", async function () {
        expect(
          await organizationResolver.isOrganizationMember(addr1.address)
        ).to.equal(true);
        expect(
          await organizationResolver.isOrganizationMember(addr2.address)
        ).to.equal(true);
        expect(
          await organizationResolver.isOrganizationMember(addr3.address)
        ).to.equal(false);
      });
    });
  
    describe("Manage Members", function () {
      it("Should allow owner to add members", async function () {
        await organizationResolver.addToMembers(addr3.address);
        expect(
          await organizationResolver.isOrganizationMember(addr3.address)
        ).to.equal(true);
      });
  
      it("Should allow owner to remove members", async function () {
        await organizationResolver.removeFromMembers(addr1.address);
        expect(
          await organizationResolver.isOrganizationMember(addr1.address)
        ).to.equal(false);
      });
  
      it("Should not allow non-owner to add or remove members", async function () {
        await expect(
          organizationResolver.connect(addr1).addToMembers(addrs[0].address)
        ).to.be.revertedWith("Only the owner can call this function");
        await expect(
          organizationResolver.connect(addr1).removeFromMembers(addr2.address)
        ).to.be.revertedWith("Only the owner can call this function");
      });
    });
  
    describe("Check Membership", function () {
      it("Should return true for members and false for non-members", async function () {
        expect(
          await organizationResolver.isOrganizationMember(addr1.address)
        ).to.equal(true);
        expect(
          await organizationResolver.isOrganizationMember(addrs[0].address)
        ).to.equal(false);
      });
    });
  });`;

  if (currentIndex < codeText.length) {
    setTimeout(() => {
      setCode(codeText.substring(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);
  }

  return (
    <>
      <NavBar back="3" next="5" />
      <div className="container mx-auto">
        <header className="text-3xl font-bold mb-4 ">
          <TypeWriterOnce text="Test Resolver Contract" speed={speed} />
        </header>

        <AceEditor
          mode="javascript"
          theme="monokai"
          name="code-viewer"
          value={code}
          width="100%"
          height="700px"
          readOnly={true}
          fontSize={20}
          wrapEnabled={true}
        />
      </div>
    </>
  );
};
