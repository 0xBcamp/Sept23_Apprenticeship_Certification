const { ethers } = require("hardhat");

async function main() {
  // const BlockBadgeSBT = await ethers.deployContract("BlockBadgeSBT", []);
  // await BlockBadgeSBT.waitForDeployment();
  // console.log(`BlockBadgeSBT deployed at ${BlockBadgeSBT.target}`);

  let args = [
    "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
    "Bcamp",
    ["0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe"],
    "0xB34d14837a2e3Ad9A0B111d2477786C613109521",
  ];

  // const OrganizationResolver = await ethers.deployContract(
  //   "OrganizationResolver",
  //   args
  // );
  // await OrganizationResolver.waitForDeployment();
  // console.log(`Contract deployed at ${OrganizationResolver.target}`);

  verify("0xB34d14837a2e3Ad9A0B111d2477786C613109521", []);
  verify("0xaaCf8d59AF3e6404D7473d2275dbe89f5F01f11f", args);
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
