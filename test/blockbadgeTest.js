const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("AttesterResolver", function () {

    it("confirm mentor", async function () {
        const [owner,addr1] = await ethers.getSigners();
        const ARDeploy = await ethers.deployContract("AttesterResolver", ["0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587", [addr1]]);
        const result = await ARDeploy.isBcampMentor(addr1);
        expect(result).to.equal(true);
    
    });

    it("remove mentors using removeFromBcampMentors", async function () {
        const [owner,addr1] = await ethers.getSigners();
        const ARDeploy = await ethers.deployContract("AttesterResolver", ["0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587", [addr1]]);
        await ARDeploy.removeFromBcampMentors(addr1);
        const result = await ARDeploy.isBcampMentor(addr1);
        expect(result).to.equal(false);
    
    });

    it("adding mentors using addToBcampMentors", async function () {
        const [owner,addr1,addr2] = await ethers.getSigners();
        const ARDeploy = await ethers.deployContract("AttesterResolver", ["0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587", [addr1]]);
        await ARDeploy.addToBcampMentors(addr2);
        const result = await ARDeploy.isBcampMentor(addr2);
        expect(result).to.equal(true);
    
    });

    it("cannot add Bcamp mentors if not owner", async function () {
        const [owner,addr1,addr2] = await ethers.getSigners();
        const ARDeploy = await ethers.deployContract("AttesterResolver", ["0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587", [addr1]]);
        const contractWithAddr1 = ARDeploy.connect(addr1);
        await expect(contractWithAddr1.addToBcampMentors(addr2)).to.be.reverted;
    
    });




});