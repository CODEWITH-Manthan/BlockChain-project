// Direct deploy script using ethers.js — no Hardhat needed
// Compiles and deploys using solcjs output bytecode

const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");

// Load .env from project root (one level up from blockchain/)
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// ABI and Bytecode — generated from Procurement.sol
// Run: npx solcjs --abi --bin contracts/Procurement.sol --output-dir build/
// Then paste the outputs below OR load from file.

async function deploy() {
  const rpc = process.env.RPC_URL;
  const pk = process.env.PRIVATE_KEY;

  if (!rpc || !pk) {
    throw new Error("Missing RPC_URL or PRIVATE_KEY in .env");
  }

  const provider = new ethers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(pk.startsWith("0x") ? pk : `0x${pk}`, provider);

  const balance = await provider.getBalance(wallet.address);
  console.log("Deployer:", wallet.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    throw new Error("Wallet has 0 ETH. Get Sepolia test ETH from https://sepoliafaucet.com");
  }

  // Load ABI and bytecode from build folder
  const buildDir = path.join(__dirname, "../build");
  const files = fs.readdirSync(buildDir);
  const abiFile = files.find(f => f.toLowerCase().endsWith(".abi"));
  const binFile = files.find(f => f.toLowerCase().endsWith(".bin"));

  if (!abiFile || !binFile) {
    throw new Error("Build files not found in: " + buildDir);
  }

  const abi = JSON.parse(fs.readFileSync(path.join(buildDir, abiFile), "utf8"));
  const bytecode = "0x" + fs.readFileSync(path.join(buildDir, binFile), "utf8").trim();

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  console.log("Deploying contract...");

  const contract = await factory.deploy(wallet.address);
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("✅ Deployed to:", address);
  console.log("\n>>> Add this to your .env:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);

  // Save ABI to src/utils for frontend use
  const utilsPath = path.join(__dirname, "../src/utils/ProcurementABI.json");
  fs.writeFileSync(utilsPath, JSON.stringify(abi, null, 2));
  console.log("✅ ABI saved to src/utils/ProcurementABI.json");
}

deploy().catch(console.error);
