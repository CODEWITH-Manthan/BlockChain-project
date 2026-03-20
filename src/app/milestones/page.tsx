'use client';

import React, { useState } from 'react';
import { useProcurement } from '@/hooks/useProcurement';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { Badge } from '@/components/Badge';

export default function MilestonesPage() {
  const { projects, milestones, addMilestone, updateMilestoneStatus } = useProcurement();
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddMilestone = () => {
    if (!projectId || !title || !amount) return alert('Fill all fields');
    addMilestone({
      id: `ms-${Date.now()}`,
      projectId,
      title,
      progress: 0,
      amount: parseFloat(amount),
      status: 'Pending'
    });
    alert('Milestone added in Mock State!');
    setTitle(''); setAmount('');
  };

  const getProjectName = (id: string) => projects.find(p => p.id === id)?.name || 'Unknown Project';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <h1 className="text-2xl font-semibold text-white">Project Milestones</h1>
      
      <Card className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Add New Milestone</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            className="sm:w-1/4 bg-[#2c2c2f] text-white border-transparent rounded-md px-3 py-2 text-sm outline-none"
            value={projectId} onChange={e => setProjectId(e.target.value)}
          >
            <option value="">- Project -</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input 
            type="text" placeholder="Milestone Title" 
            className="flex-1 bg-[#2c2c2f] text-white border-transparent rounded-md px-3 py-2 text-sm outline-none"
            value={title} onChange={e => setTitle(e.target.value)}
          />
          <input 
            type="number" placeholder="Amount (₹)" 
            className="sm:w-32 bg-[#2c2c2f] text-white border-transparent rounded-md px-3 py-2 text-sm outline-none"
            value={amount} onChange={e => setAmount(e.target.value)}
          />
          <button 
            onClick={handleAddMilestone} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </Card>

      <div className="grid gap-6">
        {milestones.length === 0 && <p className="text-gray-500">No milestones yet.</p>}
        {milestones.map((m) => (
          <Card key={m.id} className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-medium text-white">{m.title}</h3>
                  <p className="text-sm text-gray-400">Project: {getProjectName(m.projectId)} | Amount: ₹{m.amount.toLocaleString('en-IN')}</p>
                </div>
                <Badge status={m.status} />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-400">Completion</span>
                  <span className="text-gray-400">{m.progress}%</span>
                </div>
                <ProgressBar progress={m.progress} />
              </div>
            </div>
            
            <div className="w-full sm:w-1/3 flex sm:justify-end gap-2 mt-4 sm:mt-0">
              {m.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => updateMilestoneStatus(m.id, 'Approved')}
                    className="bg-green-600/20 text-green-500 hover:bg-green-600/30 border border-green-800 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => { alert('Rejected!'); }}
                    className="bg-red-600/20 text-red-500 hover:bg-red-600/30 border border-red-800 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
