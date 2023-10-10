import { expect } from "chai";
import { ethers } from "hardhat";

describe("BlockBadge", function () {
  let owner, mentor, anotherMentor, apprentice, blockBadge, schemaResolver;
  const bcampValue = ethers.utils.parseEther("1"); // 1 Ether
  const customStringValue = ethers.utils.parseEther("0.5"); // 0.5 Ether

  beforeEach(async () => {
    [owner, mentor, anotherMentor, apprentice] = await ethers.getSigners();

    const BlockBadge = await ethers.getContractFactory("BlockBadge");
    blockBadge = await BlockBadge.deploy(
      schemaResolver.address,
      "someURI",
      bcampValue,
      customStringValue
    );
  });

  describe("Mentor Management", function () {
    it("Should allow owner to remove a mentor", async function () {
      await blockBadge.addMentor(mentor.address);
      await blockBadge.removeMentor(mentor.address);
      expect(await blockBadge.isMentor(mentor.address)).to.equal(false);
    });

    it("Should not allow non-owners to add or remove mentors", async function () {
      await expect(
        blockBadge.connect(mentor).addMentor(anotherMentor.address)
      ).to.be.revertedWith("Only the owner can call this function");
      await expect(
        blockBadge.connect(mentor).removeMentor(anotherMentor.address)
      ).to.be.revertedWith("Only the owner can call this function");
    });
  });

  describe("Certification Registration", function () {
    beforeEach(async () => {
      await blockBadge.addMentor(mentor.address);
    });

    it("Should allow mentors to register a BCamp certification", async function () {
      const certificationName = "BCamp";
      await expect(
        blockBadge
          .connect(mentor)
          .registerCertification("Alice", certificationName, Date.now(), {
            value: bcampValue,
          })
      ).to.emit(blockBadge, "TransferSingle"); // ERC1155 event
    });

    it("Should allow mentors to register custom certifications", async function () {
      const certificationName = "CustomCert";
      await expect(
        blockBadge
          .connect(mentor)
          .registerCertification("Alice", certificationName, Date.now(), {
            value: customStringValue,
          })
      ).to.emit(blockBadge, "TransferSingle");
    });

    it("Should not allow non-mentors to register certifications", async function () {
      await expect(
        blockBadge
          .connect(apprentice)
          .registerCertification("Alice", "BCamp", Date.now(), {
            value: bcampValue,
          })
      ).to.be.revertedWith("Not a mentor");
    });
  });

  describe("SchemaResolver Implementation", function () {
    // test the onAttest and onRevoke functions

    // example:
    it("Should return true in onAttest if attester is a mentor", async function () {
      // simplistic test and might need to be refined
      const mockAttestation = {
        attester: mentor.address,
        recipient: apprentice.address,
        schema: "someSchema",
        data: "someData",
        nonce: 1,
      };
      const result = await blockBadge.onAttest(mockAttestation, 0);
      expect(result).to.equal(true);
    });

    it("Should return true in onRevoke", async function () {
      // test for the onRevoke function
      const mockAttestation = {
        attester: mentor.address,
        recipient: apprentice.address,
        schema: "someSchema",
        data: "someData",
        nonce: 1,
      };
      const result = await blockBadge.onRevoke(mockAttestation, 0);
      expect(result).to.equal(true);
    });
  });
});
