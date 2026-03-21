'use client';

import React from 'react';
import { useProcurement } from '@/context/ProcurementContext';
import { Badge } from '@/components/Badge';
import { FileText, Database, PiggyBank, Briefcase, Table, ShieldCheck, Clock, Fingerprint, CheckCircle } from 'lucide-react';

export default function AuditDashboardPage() {
  const { projects, milestones, invoices } = useProcurement();

  // Computations
  const totalAllocated = projects.reduce((acc, p) => acc + p.budget, 0);
  const actualSpend = milestones.filter(m => m.status === 'Paid').reduce((acc, m) => acc + m.amount, 0);
  const paidMilestones = milestones.filter(m => m.status === 'Paid');

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2 flex items-center space-x-3">
          <ShieldCheck className="text-emerald-500" size={32} />
          <span>Audit & Transparency Portal</span>
        </h1>
        <p className="text-gray-400">Read-only dashboard for regulators to verify budget allocation, material logs, and immutable payment histories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1c1c1f] border border-[#2c2c2f] rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <PiggyBank size={80} />
          </div>
          <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide flex items-center space-x-2">
            <span>Macro Budget Allocation</span>
          </p>
          <p className="text-4xl font-bold text-white mb-1 tracking-tight">₹{totalAllocated.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Total escrow locked across {projects.length} initialized projects</p>
        </div>

        <div className="bg-[#1c1c1f] border border-[#2c2c2f] rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Database size={80} />
          </div>
          <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide flex items-center space-x-2">
            <span>Verified Actual Spend</span>
          </p>
          <p className="text-4xl font-bold text-white mb-1 tracking-tight">₹{actualSpend.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Total funds released to contractors post-validation ({((actualSpend/totalAllocated)*100 || 0).toFixed(1)}% burn rate)</p>
          
          <div className="w-full bg-[#151518] rounded-full h-1.5 mt-5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(actualSpend/totalAllocated)*100 || 0}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        
        {/* Material Logs Table */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-white font-medium text-lg mb-4">
            <Fingerprint className="text-purple-400" size={20} />
            <h3>Immutable Material Procurement Logs</h3>
          </div>
          
          <div className="bg-[#1c1c1f] border border-[#2c2c2f] rounded-2xl overflow-hidden">
            {invoices.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">No material logs hashed on chain yet.</div>
            ) : (
              <div className="divide-y divide-[#2c2c2f]">
                {invoices.map(inv => {
                  const p = projects.find(proj => proj.id === inv.projectId);
                  return (
                    <div key={inv.id} className="p-4 hover:bg-[#222225] transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs uppercase tracking-wider font-bold text-gray-400 bg-[#333336] px-2 py-0.5 rounded-md">
                            {inv.type || 'Generic Document'}
                          </span>
                          <span className="text-sm font-medium text-white">{inv.fileName}</span>
                        </div>
                        <span className="text-sm text-gray-400 font-mono">₹{inv.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Project ID: {p?.name}</p>
                      <div className="bg-purple-900/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] px-2 py-1.5 rounded-lg break-all inline-block w-full">
                        SHA-256 Ledger Hash: {inv.hash}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Milestone Completion & Payment History */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-white font-medium text-lg mb-4">
            <Table className="text-blue-400" size={20} />
            <h3>Milestone Payment History</h3>
          </div>
          
          <div className="bg-[#1c1c1f] border border-[#2c2c2f] rounded-2xl overflow-hidden">
            {paidMilestones.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">No recorded milestone dispersals on chain yet.</div>
            ) : (
              <div className="divide-y divide-[#2c2c2f]">
                {paidMilestones.map(m => {
                  const p = projects.find(proj => proj.id === m.projectId);
                  return (
                    <div key={m.id} className="p-4 flex items-center justify-between hover:bg-[#222225] transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <CheckCircle size={14} className="text-emerald-500" />
                          <h4 className="text-white text-sm font-medium">{m.title}</h4>
                        </div>
                        <p className="text-xs text-gray-500">Contractor: {p?.contractor}</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="text-sm font-bold text-emerald-400 tracking-tight font-mono mb-1.5">+ ₹{m.amount.toLocaleString()}</span>
                        <Badge status={m.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
