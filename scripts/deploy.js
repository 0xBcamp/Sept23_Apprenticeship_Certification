const { ethers } = require("hardhat");

async function main() {
  const args = [
    "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
    "Bcamp",
    ["0xB0739AaF97B5F12D3529ec6C109fbE1A9c9F6bAe"],
    "0x88B04A6b48f8fef91548cE39C7D1d79F1FCb8cd3",
  ];
  // const lock = await ethers.deployContract("OrganizationResolver", args);

  // await lock.waitForDeployment();

  // console.log(`Contract deployed at ${lock.target}`);

  verify("0xc8987A465Fdc437a9048a506Ef3A74aEc46821fd", args);
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
