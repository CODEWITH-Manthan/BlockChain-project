# Aphelion Cluster: Decentralized Procurement & Escrow System

**Aphelion Cluster** is a blockchain-powered procurement and infrastructure management platform built to enforce absolute transparency, eliminate corruption, and guarantee automated fund disbursements for public and private sector projects.

## ⚠️ The Problem Statement

In traditional government and large-scale corporate procurement:
1. **Lack of Transparency**: Invoices, material receipts, and quality certificates are easily tampered with, backdated, or fabricated behind closed doors.
2. **Delayed Payments**: Contractors suffer from massive delays waiting for bureaucratic approvals to release milestone funds.
3. **Zero Accountability**: Auditors and public regulators lack a single, immutable source of truth to verify where allocated budgets actually went.

## 💡 Our Solution

We solve this using a **Decentralized Escrow Protocol** and **Immutable Content Hashing**:
* **Smart Contract Escrow**: Project budgets are locked in a smart contract. Funds are physically inaccessible until specific project "Milestones" are cryptographically approved.
* **Tamper-Proof Proof of Work**: Contractors upload supply chain receipts and invoices. Our system hashes these documents (SHA-256) and stores the hash directly on the blockchain ledger. If a file is ever altered, the hashes will instantly mismatch, proving tampering.
* **Role-Based Access Control (RBAC)**: Distinct, isolated views ensuring no overlapping interference.

## 👥 User Roles

1. **ADMIN (Authority / Government Official)**
   * Initializes infrastructure projects and locks the total budget into the smart contract.
   * Reviews Contractor submissions and clicks a single button to cryptographically trigger the smart contract to release funds for a completed milestone.
2. **CONTRACTOR (Service Provider / Vendor)**
   * Manages on-site execution. Accesses the `/upload-invoice` portal to submit immutable proofs of delivery and tracks real-time progress of their pending payouts.
3. **REGULATOR (Inspector / Auditor)**
   * Read-Only oversight. Accesses the **Audit Portal** to transparently track macro budget allocations vs. actual spend, and verifies immutable material logs for complete accountability.

## 🛠️ Technology Stack

* **Frontend**: Next.js 16 (App Router), React, TailwindCSS, Lucide Icons.
* **Authentication / Backend API**: Express.js, JSON Web Tokens (JWT), bcryptjs.
* **Blockchain / Web3**: Solidity, Hardhat, Ethers.js.

## 🚀 Getting Started

Follow these steps to run the Aphelion Cluster locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application
We have configured `concurrently` to automatically run both the **Next.js Frontend** and the **Express Authentication Backend** at the same time.

```bash
npm run dev
```
* **Frontend UI**: [http://localhost:3000](http://localhost:3000)
* **Backend API**: [http://localhost:5000](http://localhost:5000)

### 3. Smart Contract Deployment (Optional)
If you wish to compile and deploy the raw smart contracts to a local Ethereum node, navigate to the blockchain directory:
```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

---
*Built for Hackathon 2026 - Fighting Corruption through Code.*
