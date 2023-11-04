const { expect } = require("chai");
const { ethers } = require("hardhat");

    let organizationResolver;
    let blockBadgeSBT;
    let addr1;
    let addr2;


    
    beforeEach(async function () {
        this.timeout(60000);
        let signers = await ethers.getSigners();
        addr1 = signers[0].address;
        addr2 = signers[1].address;

        blockBadgeSBT = await ethers.deployContract("BlockBadgeSBT");
        await blockBadgeSBT.waitForDeployment();
        let SBTAddress = blockBadgeSBT.address;
            
        let OrganizationResolver = await ethers.getContractFactory("OrganizationResolver");
        organizationResolver = await OrganizationResolver.connect(signers[0]).deploy("0xC2679fBD37d54388Ce493F1DB75320D236e1815e","BCAMP",[addr1],blockBadgeSBT);

        await organizationResolver.waitForDeployment();


      });
            
describe("Resolver Contract", function () {

      describe("Deployment", function () {
        it("Should set the organization name correctly", async function () {
            expect(await organizationResolver.organizationName()).to.equal(
              "BCAMP"
            );
          });

        it("Should add first address as member on deployment", async function () {
          const result = await organizationResolver.isOrganizationMember(addr1);
          expect(result).to.equal(true);
        });

    });

    describe("Adding and Removing Members", function () {
        it("Should allow owner to add members", async function () {
          await organizationResolver.addToMembers(addr2);
          expect(
            await organizationResolver.isOrganizationMember(addr2)
          ).to.equal(true);
        });
            
        it("Should allow owner to remove members", async function () {
            await organizationResolver.addToMembers(addr2);
            await organizationResolver.removeFromMembers(addr2);
      expect(
        await organizationResolver.isOrganizationMember(addr2)
      ).to.equal(false);
    });

    it("Should not allow non-owner to add or remove members", async function () {
        await organizationResolver.removeFromMembers(addr1);
        expect(
            await organizationResolver.addToMembers(addr2)
        ).to.be.reverted;
        
      });
    });

      describe("Check Membership", function () {
        it("Should return true for members and false for non-members", async function () {
          expect(
            await organizationResolver.isOrganizationMember(addr1)
          ).to.equal(true);
          expect(
            await organizationResolver.isOrganizationMember(addr2)
          ).to.equal(false);
        });
      });
    
    });

describe("SBT Contract", function () {



    describe("Check SBT Mint", function () {
        it("Should mint the token", async function () {
            await blockBadgeSBT._safeMint(addr1);
            expect(await blockBadgeSBT.getTokenOwner(0)).to.equal(addr1);
          });
        it("Should not be able to transfer", async function () {
            await blockBadgeSBT._safeMint(addr1);
            await expect(blockBadgeSBT.transferFrom(addr1,addr2,0)).to.be.reverted;
          });





        });




    });


    
    
    
  


    








