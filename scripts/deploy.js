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
  //   [
  //     "0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe",
  //     "0x2bf2FE4Ec99F6AF6d84a26222B65E16214F69596",
  //     "0x49c1f89C53AeD52d6b67B97e56beC081245143CB",
  //   ],
  //   "0xc2DCE87f1073006535df3162AaAb2a64F3B7Bb14",
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
  // verify("0xc2DCE87f1073006535df3162AaAb2a64F3B7Bb14", []);
  // // OrganizationResolver
  // verify("0xd0Cc2f9fAd06c7F5012aDebC65D4f299453d6F76", args);
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
