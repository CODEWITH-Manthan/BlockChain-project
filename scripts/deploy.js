const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const contractorAddress = deployer.address;
  const Procurement = await hre.ethers.getContractFactory("Procurement");
  const procurement = await Procurement.deploy(contractorAddress);
  await procurement.waitForDeployment();

  const address = await procurement.getAddress();
  console.log("Procurement Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
