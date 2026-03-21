const { ethers } = require("ethers");
require("dotenv").config();

// Contract ABI - Add full ABI inside this array or require it from artifacts
let CONTRACT_ABI = [];
try {
  CONTRACT_ABI = require("../../artifacts/contracts/Procurement.sol/Procurement.json").abi;
} catch (error) {
  console.log("Warning: Procurement ABI not found. Hardhat contracts may not be compiled.");
}
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"; // Replace with deployed address

let contract, wallet, provider;

try {
  provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "http://127.0.0.1:8545");
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000", provider);
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
} catch(e) {
  console.log("Blockchain connection configured, waiting for valid RPC_URL and PRIVATE_KEY");
}

module.exports = { contract, provider, wallet };
