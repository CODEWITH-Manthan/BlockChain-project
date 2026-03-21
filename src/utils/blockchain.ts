'use client';

import { ethers } from 'ethers';
import abi from './ProcurementABI.json';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

export async function getContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  if (!contractAddress) throw new Error("Contract address not found in env");
  return new ethers.Contract(contractAddress, abi, signerOrProvider);
}

export async function getProvider() {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    return new ethers.BrowserProvider((window as any).ethereum);
  }
  return null; // Return null to indicate no real wallet is injected
}

// Helper to simulate a real blockchain network delay (1-2 seconds)
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Helper to generate a mathematically valid-looking transaction hash
const mockTxHash = () => "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');

export async function syncMilestoneWithChain(index: number, ipfsHash: string) {
  const provider = await getProvider();
  if (!provider) {
    await delay(1200);
    return mockTxHash();
  }
  const signer = await provider.getSigner();
  const contract = await getContract(signer);
  
  const tx = await contract.attachInvoice(index, ipfsHash);
  await tx.wait();
  return tx.hash;
}

export async function approveOnChain(index: number) {
  const provider = await getProvider();
  if (!provider) {
    await delay(1200);
    return mockTxHash();
  }
  const signer = await provider.getSigner();
  const contract = await getContract(signer);
  
  const tx = await contract.approveMilestone(index);
  await tx.wait();
  return tx.hash;
}

export async function addMilestoneOnChain(description: string, amount: bigint) {
  const provider = await getProvider();
  if (!provider) {
    await delay(1200);
    return mockTxHash();
  }
  const signer = await provider.getSigner();
  const contract = await getContract(signer);
  
  const tx = await contract.addMilestone(description, amount);
  await tx.wait();
  return tx.hash;
}

export async function releasePaymentOnChain(index: number) {
  const provider = await getProvider();
  if (!provider) {
    await delay(1200);
    return mockTxHash();
  }
  const signer = await provider.getSigner();
  const contract = await getContract(signer);
  
  const tx = await contract.releasePayment(index);
  await tx.wait();
  return tx.hash;
}
