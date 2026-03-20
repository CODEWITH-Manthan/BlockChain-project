const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const Procurement = await hre.ethers.getContractFactory("Procurement");
  const procurement = await Procurement.deploy(deployer.address);
  await procurement.waitForDeployment();

  const address = await procurement.getAddress();
  console.log("✅ Procurement Contract deployed to:", address);
  console.log("\nNow add this to your .env:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
