const { ethers } = require("hardhat");

async function main() {
  // const BlockBadgeBNS = await ethers.deployContract("BlockBadgeBNS", []);
  // await BlockBadgeBNS.waitForDeployment();
  // console.log(`BlockBadgeBNS deployed at ${BlockBadgeBNS.target}`);
  // const BlockBadgeSBT = await ethers.deployContract("BlockBadgeSBT", []);
  // await BlockBadgeSBT.waitForDeployment();
  // console.log(`BlockBadgeSBT deployed at ${BlockBadgeSBT.target}`);
  // let args = [
  //   "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
  //   "Bcamp",
  //   ["0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe"],
  //   "0xCfA89b1B05033725e2d0949c10902269122DeA5f",
  // ];
  // const OrganizationResolver = await ethers.deployContract(
  //   "OrganizationResolver",
  //   args
  // );
  // await OrganizationResolver.waitForDeployment();
  // console.log(
  //   `OrganizationResolver deployed at ${OrganizationResolver.target}`
  // );
  // // BlockBadgeBNS
  // verify("0x353998eF92fE5990cDa2551AFC8967b5c2749adC", []);
  // // BlockBadgeSBT
  // verify("0xCfA89b1B05033725e2d0949c10902269122DeA5f", []);
  // // OrganizationResolver
  // verify("0x3c6dc01cf382eBe5460B7346340c6Ae41f8269d2", args);
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
