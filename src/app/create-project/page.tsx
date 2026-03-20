'use client';
import React, { useState } from 'react';
import { useProcurement } from '@/hooks/useProcurement';
import { Card } from '@/components/Card';

export default function CreateProjectPage() {
  const { addProject } = useProcurement();
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [contractor, setContractor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!name || !budget || !contractor) return alert('Fill all fields');
    addProject({
      id: `proj-${Date.now()}`,
      name,
      budget: parseFloat(budget),
      contractor
    });
    alert('Project Created successfully in Mock State!');
    setName(''); setBudget(''); setContractor('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-white">Create New Project</h1>
      <Card className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl">
        <p className="text-gray-400 mb-6">Fill in the details below to initialize a new procurement project.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
            <input 
              type="text" 
              className="w-full bg-[#2c2c2f] text-white border-transparent rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g. City Bridge Expansion"
              value={name} onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Budget Allocation (₹)</label>
            <input 
              type="number" 
              className="w-full bg-[#2c2c2f] text-white border-transparent rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="0.00"
              value={budget} onChange={e => setBudget(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Contractor Address / Name</label>
            <input 
              type="text" 
              className="w-full bg-[#2c2c2f] text-white border-transparent rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="0x..."
              value={contractor} onChange={e => setContractor(e.target.value)}
            />
          </div>
          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
