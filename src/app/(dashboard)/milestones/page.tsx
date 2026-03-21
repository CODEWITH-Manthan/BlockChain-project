'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProcurement } from '@/context/ProcurementContext';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Milestone, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function MilestonesPage() {
  const router = useRouter();
  const { projects, milestones, invoices, addMilestone, updateMilestoneStatus, role, profile } = useProcurement();
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;
    addMilestone({
      id: `ms-${Date.now()}`,
      projectId,
      title,
      amount: Number(amount),
      progress: 0,
      status: 'Pending'
    });
    setTitle(''); setAmount(''); setProjectId('');
  };

  const handleApprove = async (id: string) => {
    await updateMilestoneStatus(id, 'Approved');
    setTimeout(() => {
      router.push('/payments');
    }, 2000);
  };

  const filteredMilestones = milestones.filter(m => {
    if (role === 'ADMIN') {
      return m.status === 'Pending';
    } else {
      const project = projects.find(p => p.id === m.projectId);
      if (!project) return false;
      const c = project.contractor?.toLowerCase().replace(/\s+/g, '') || '';
      const n = profile?.name?.toLowerCase().replace(/\s+/g, '') || '';
      return c === n || c.includes(n) || n.includes(c);
    }
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
          {role === 'ADMIN' ? 'Milestones & Approvals' : 'Your Project Roadmap'}
        </h1>
        <p className="text-gray-400">
          {role === 'ADMIN' 
            ? 'Add milestones to projects and approve them on-chain.' 
            : 'View your upcoming project phases and upload invoices.'}
        </p>
      </div>

      <div className={`grid grid-cols-1 ${role === 'ADMIN' ? 'lg:grid-cols-3' : 'lg:grid-cols-1 max-w-3xl mx-auto'} gap-8`}>
        {/* Add Milestone Form */}
        {role === 'ADMIN' && (
          <div className="col-span-1 border border-[#2c2c2f] bg-[#1c1c1f] rounded-3xl p-6 h-fit">
          <h3 className="text-lg font-medium text-white mb-4">Add Milestone</h3>
          <form onSubmit={handleAddMilestone} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Project</label>
              <select required value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full bg-[#151518] border border-[#333336] rounded-xl px-3 py-2 text-sm text-white">
                <option value="" disabled>Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Milestone Phase/Title</label>
              <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#151518] border border-[#333336] rounded-xl px-3 py-2 text-sm text-white" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Amount (₹)</label>
              <input required type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-[#151518] border border-[#333336] rounded-xl px-3 py-2 text-sm text-white" />
            </div>
            <button type="submit" className="w-full bg-[#333336] hover:bg-orange-600 text-white py-2 rounded-xl text-sm font-medium transition-colors mt-2">
              Add Milestone
            </button>
          </form>
          </div>
        )}

        {/* Milestone List */}
        <div className={role === 'ADMIN' ? "col-span-2 space-y-4" : "col-span-1 space-y-4"}>
          <h3 className="text-lg font-medium text-white mb-4">
            {role === 'ADMIN' ? `Pending Approvals (${filteredMilestones.length})` : `Your Milestones (${filteredMilestones.length})`}
          </h3>
          
          {filteredMilestones.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-[#333336] rounded-3xl">
              <CheckCircle className="mx-auto text-green-500 mb-2 opacity-50" size={32} />
              <p className="text-gray-500 font-medium">All caught up!</p>
            </div>
          ) : (
            filteredMilestones.map(m => {
              const project = projects.find(p => p.id === m.projectId);
              const hasInvoice = !!m.invoiceUploaded;
              
              return (
                <div key={m.id} className="bg-[#1c1c1f] border border-[#2c2c2f] p-5 rounded-3xl flex flex-col md:flex-row items-stretch md:items-center justify-between hover:border-gray-700 transition-colors gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-white font-semibold text-lg">{m.title}</h4>
                      <Badge status={m.status} />
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Project: <span className="text-gray-400">{project?.name || 'Unknown'}</span></p>
                    
                    {/* Status Breakdown Panel */}
                    <div className="flex flex-col space-y-2 bg-[#151518] p-3.5 rounded-2xl border border-[#2c2c2f] text-xs font-medium w-full max-w-sm">
                      <div className="flex justify-between items-center text-gray-400">
                        <span>Invoice Document:</span>
                        <span className={hasInvoice ? "text-green-400" : "text-blue-400"}>{hasInvoice ? 'Uploaded ✅' : 'Pending Upload ⏳'}</span>
                      </div>
                      
                      {m.invoiceHash && role === 'ADMIN' && (
                        <div className="bg-purple-900/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] break-all px-2.5 py-1.5 rounded-lg my-0.5">
                          Hash: {m.invoiceHash}
                        </div>
                      )}

                      <div className="flex justify-between items-center text-gray-400">
                        <span>Approval Status:</span>
                        <span className={m.status !== 'Pending' ? "text-green-400" : "text-orange-400"}>
                          {m.status !== 'Pending' ? 'Approved ✅' : 'Pending ❌'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400">
                        <span>Fund Payment:</span>
                        <span className={m.status === 'Paid' ? "text-green-400" : "text-gray-500"}>
                          {m.status === 'Paid' ? 'Released 💸' : 'Locked 🔒'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-center min-w-[140px] pl-4 md:border-l border-[#2c2c2f]">
                    <span className="text-xl font-bold text-white mb-4">₹{m.amount.toLocaleString()}</span>
                    
                    {role === 'ADMIN' ? (
                      hasInvoice ? (
                        <button 
                          onClick={() => handleApprove(m.id)}
                          className="w-full text-sm font-bold px-4 py-2.5 rounded-xl transition-all bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 active:scale-95"
                        >
                          Approve Milestone
                        </button>
                      ) : (
                        <div className="w-full text-sm font-bold px-4 py-2.5 rounded-xl bg-gray-800 text-gray-400 border border-gray-700 text-center cursor-not-allowed">
                          Awaiting Contractor Invoice
                        </div>
                      )
                    ) : (
                      m.status === 'Paid' ? (
                        <div className="w-full text-sm font-bold px-4 py-2.5 rounded-xl bg-green-900/20 text-green-400 border border-green-800/50 text-center">
                          Payment Released
                        </div>
                      ) : m.status === 'Approved' ? (
                        <div className="w-full text-sm font-bold px-4 py-2.5 rounded-xl bg-blue-900/20 text-blue-400 border border-blue-800/50 text-center">
                          Awaiting Payment
                        </div>
                      ) : hasInvoice ? (
                        <div className="w-full text-sm font-bold px-4 py-2.5 rounded-xl bg-gray-800 text-gray-400 border border-gray-700 text-center cursor-not-allowed">
                          Pending Admin Approval
                        </div>
                      ) : (
                        <button 
                          onClick={() => router.push('/upload-invoice')}
                          className="w-full text-sm font-bold px-4 py-2.5 rounded-xl transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95 text-center"
                        >
                          Next: Upload Invoice
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
