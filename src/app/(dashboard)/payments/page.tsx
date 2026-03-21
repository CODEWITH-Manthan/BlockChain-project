'use client';

import React, { useState } from 'react';
import { useProcurement } from '@/context/ProcurementContext';
import { Badge } from '@/components/Badge';
import { ActivityLog } from '@/components/ActivityLog';
import { CreditCard, ShieldCheck, LockKeyhole, FileKey2 } from 'lucide-react';

export default function PaymentsPage() {
  const { projects, milestones, updateMilestoneStatus, role } = useProcurement();
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [inputHash, setInputHash] = useState('');
  const [error, setError] = useState('');

  const approvedMilestones = milestones.filter(m => m.status === 'Approved');
  const paidMilestones = milestones.filter(m => m.status === 'Paid');

  const handleVerifyAndPay = (m: any) => {
    if (inputHash.trim() === m.invoiceHash) {
      updateMilestoneStatus(m.id, 'Paid');
      setVerifyingId(null);
      setInputHash('');
      setError('');
    } else {
      setError('Cryptographic signature mismatch. Payment blocked.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Release Payments</h1>
        <p className="text-gray-400">Process smart contract payments for approved project milestones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-start space-x-3 text-blue-400">
            <LockKeyhole size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm font-medium">Funds are released only after verified milestone approval with a successfully synced metadata document hash.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Pending Payments ({approvedMilestones.length})</h3>
            
            {approvedMilestones.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-[#333336] rounded-3xl">
                <ShieldCheck className="mx-auto text-green-500 mb-2 opacity-50" size={32} />
                <p className="text-gray-500 font-medium">No pending payments.</p>
              </div>
            ) : (
              approvedMilestones.map(m => {
                const project = projects.find(p => p.id === m.projectId);
                return (
                  <div key={m.id} className="bg-[#1c1c1f] border border-[#2c2c2f] p-6 rounded-3xl flex flex-col hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium text-lg mb-1">{m.title} <Badge status={m.status} /></h4>
                        <p className="text-xs text-gray-500 mt-2">Project: <span className="text-gray-400">{project?.name || 'Unknown'}</span></p>
                        <p className="text-xs text-gray-500 mt-1">Contractor: <span className="text-gray-400">{project?.contractor || 'Unknown'}</span></p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="text-2xl font-bold text-white tracking-tight">₹{m.amount.toLocaleString()}</span>
                        {role === 'ADMIN' && (
                          verifyingId !== m.id ? (
                            <button 
                              onClick={() => { setVerifyingId(m.id); setInputHash(''); setError(''); }}
                              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-3 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-95"
                            >
                              <CreditCard size={18} />
                              <span>Release Funds</span>
                            </button>
                          ) : (
                            <button 
                              onClick={() => { setVerifyingId(null); setError(''); setInputHash(''); }}
                              className="text-gray-400 hover:text-white text-sm font-medium px-3 py-2 transition-colors"
                            >
                              Cancel
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {verifyingId === m.id && (
                      <div className="mt-6 pt-6 border-t border-[#2c2c2f] animate-in slide-in-from-top-4 duration-300">
                        <div className="bg-[#151518] border border-[#333336] p-5 rounded-2xl">
                           <h5 className="text-white font-medium mb-2 flex items-center space-x-2">
                             <FileKey2 size={16} className="text-purple-400" />
                             <span>Cryptographic Authorization Required</span>
                           </h5>
                           <p className="text-xs text-gray-400 mb-4">
                             Please enter the exact Document Hash generated during the invoice upload to cryptographically sign and authorize this smart contract disbursement.
                           </p>
                           <div className="flex space-x-3">
                             <input 
                               type="text" 
                               value={inputHash}
                               onChange={(e) => { setInputHash(e.target.value); setError(''); }}
                               placeholder="e.g. 0x8af3..."
                               className="flex-1 bg-[#1c1c1f] border border-[#333336] rounded-xl px-4 py-2 text-sm text-white font-mono focus:ring-purple-500 focus:border-purple-500 transition-colors"
                             />
                             <button
                               onClick={() => handleVerifyAndPay(m)}
                               className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-lg shadow-green-900/20 transition-all active:scale-95 whitespace-nowrap"
                             >
                               Verify & Release
                             </button>
                           </div>
                           {error && <p className="text-red-400 text-xs mt-3 font-medium">{error}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {paidMilestones.length > 0 && (
            <div className="mt-12 space-y-4">
              <h3 className="text-lg font-medium text-white mb-4">Recent Transactions</h3>
              {paidMilestones.slice(0, 5).map(m => (
                <div key={m.id} className="flex justify-between items-center bg-[#151518] p-5 rounded-3xl border border-[#222225]">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <ShieldCheck size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium mb-1.5">{m.title}</p>
                      <Badge status={m.status} />
                    </div>
                  </div>
                  <p className="text-white font-mono text-base font-medium tracking-tight">₹{m.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}
