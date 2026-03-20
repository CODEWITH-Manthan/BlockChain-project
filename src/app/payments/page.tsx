'use client';

import React from 'react';
import { useProcurement } from '@/hooks/useProcurement';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function PaymentsPage() {
  const { projects, milestones, updateMilestoneStatus } = useProcurement();

  const getProjectName = (id: string) => projects.find(p => p.id === id)?.name || 'Unknown Project';
  const approvedMilestones = milestones.filter(m => m.status === 'Approved');

  const handleRelease = (id: string) => {
    updateMilestoneStatus(id, 'Paid');
    alert('Payment Released Successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <h1 className="text-2xl font-semibold text-white">Payments Ledger</h1>
      
      <Card className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl">
        <h3 className="text-lg font-medium text-white mb-6">Approved Milestones Awaiting Payment</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#2c2c2f]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milestone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c2c2f]">
              {approvedMilestones.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No approved milestones await payment.</td></tr>
              )}
              {approvedMilestones.map(m => (
                <tr key={m.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{m.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{getProjectName(m.projectId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium">₹{m.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge status={m.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      onClick={() => handleRelease(m.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-xs hover:bg-blue-700 transition"
                    >
                      Release Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
