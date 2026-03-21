'use client';
import React from 'react';
import { useProcurement } from '@/context/ProcurementContext';
import { ShieldCheck, HardHat, Eye, Wallet } from 'lucide-react';

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const { role, login } = useProcurement();

  if (!role) {
    return (
      <div className="fixed inset-0 bg-[#0d0d0f] flex flex-col items-center justify-center z-[100] animate-in fade-in duration-500 overflow-y-auto pt-10 pb-20">
        <div className="mb-10 text-center px-4">
           <ShieldCheck size={56} className="text-purple-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
           <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Nexus Escrow Protocol</h1>
           <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">Select your Web3 wallet authorization role to authenticate. The smart contract will automatically map your interface based on your cryptographic signature.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-6">
          {/* Admin */}
          <button 
            onClick={() => login('ADMIN')} 
            className="bg-[#1c1c1f] hover:bg-[#222225] border border-[#2c2c2f] hover:border-blue-500/50 p-8 rounded-3xl transition-all group flex flex-col text-left shadow-2xl"
          >
            <div className="bg-blue-500/10 p-4 rounded-full mb-6 max-w-fit border border-blue-500/20 group-hover:scale-110 transition-transform">
              <ShieldCheck size={32} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Gov. Authority<br/>(Admin)</h3>
            <p className="text-sm text-gray-400">Create new infrastructure projects, manage escrow, approve milestones, and cryptographically release payments.</p>
          </button>
          
          {/* Contractor */}
          <button 
            onClick={() => login('CONTRACTOR')} 
            className="bg-[#1c1c1f] hover:bg-[#222225] border border-[#2c2c2f] hover:border-orange-500/50 p-8 rounded-3xl transition-all group flex flex-col text-left shadow-2xl"
          >
            <div className="bg-orange-500/10 p-4 rounded-full mb-6 max-w-fit border border-orange-500/20 group-hover:scale-110 transition-transform">
              <HardHat size={32} className="text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Contractor<br/>Supplier</h3>
            <p className="text-sm text-gray-400">Submit procurement logs, invoices, and quality certificates to the immutable ledger for payment processing.</p>
          </button>
          
          {/* Regulator */}
          <button 
            onClick={() => login('REGULATOR')} 
            className="bg-[#1c1c1f] hover:bg-[#222225] border border-[#2c2c2f] hover:border-emerald-500/50 p-8 rounded-3xl transition-all group flex flex-col text-left shadow-2xl"
          >
            <div className="bg-emerald-500/10 p-4 rounded-full mb-6 max-w-fit border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Eye size={32} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Auditor<br/>Regulator</h3>
            <p className="text-sm text-gray-400">Read-only oversight portal. Monitor budget allocations, actual spend, and verify immutable material logs.</p>
          </button>
        </div>
        
        <div className="mt-16 text-gray-600 flex items-center justify-center space-x-2 text-sm font-medium w-full">
          <Wallet size={16} /> <span>Simulating MetaMask signature routing</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
