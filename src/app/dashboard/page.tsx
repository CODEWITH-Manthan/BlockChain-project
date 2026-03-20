'use client';

import React from 'react';
import { useProcurement } from '@/hooks/useProcurement';
import { Card } from '@/components/Card';
import { Briefcase, DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { projects, milestones, profile } = useProcurement();

  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const completedMilestones = milestones.filter(m => m.status === 'Paid' || m.status === 'Approved').length;
  const pendingPaymentsAmount = milestones.filter(m => m.status === 'Approved').reduce((acc, m) => acc + m.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Hello, {profile?.name || 'Admin'}! <span className="text-2xl">👋</span></h1>
          <p className="text-sm text-gray-400">Overview of your infrastructure projects and fund disbursements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1c1c1f] border-gray-800 flex items-center p-6 rounded-3xl">
          <div className="bg-blue-600/20 p-4 rounded-xl mr-4">
            <Briefcase className="text-blue-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Projects</p>
            <p className="text-3xl font-bold text-white tracking-tight">{projects.length}</p>
          </div>
        </Card>

        <Card className="bg-[#1c1c1f] border-gray-800 flex items-center p-6 rounded-3xl">
          <div className="bg-green-600/20 p-4 rounded-xl mr-4">
            <DollarSign className="text-green-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Budget</p>
            <p className="text-3xl font-bold text-white tracking-tight">₹{totalBudget.toLocaleString('en-IN')}</p>
          </div>
        </Card>

        <Card className="bg-[#1c1c1f] border-gray-800 flex items-center p-6 rounded-3xl">
          <div className="bg-purple-600/20 p-4 rounded-xl mr-4">
            <CheckCircle className="text-purple-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Completed Milestones</p>
            <p className="text-3xl font-bold text-white tracking-tight">{completedMilestones}</p>
          </div>
        </Card>

        <Card className="bg-[#1c1c1f] border-gray-800 flex items-center p-6 rounded-3xl">
          <div className="bg-orange-600/20 p-4 rounded-xl mr-4">
            <Clock className="text-orange-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Pending Payments</p>
            <p className="text-3xl font-bold text-white tracking-tight">₹{pendingPaymentsAmount.toLocaleString('en-IN')}</p>
          </div>
        </Card>
      </div>

      <div className="mt-8 bg-[#1c1c1f] rounded-3xl p-6 border border-gray-800">
         <h2 className="text-xl font-medium text-white mb-4">Recent Projects</h2>
         {projects.length === 0 ? (
           <p className="text-gray-500 text-sm">No projects created yet. Use the Create Project page.</p>
         ) : (
           <ul className="space-y-3">
             {projects.map(p => (
               <li key={p.id} className="bg-[#2c2c2f] p-4 rounded-xl flex justify-between items-center">
                 <div>
                   <p className="text-white font-medium">{p.name}</p>
                   <p className="text-gray-400 text-xs">Contractor: {p.contractor}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-green-400 font-bold">₹{p.budget.toLocaleString('en-IN')}</p>
                 </div>
               </li>
             ))}
           </ul>
         )}
      </div>
    </div>
  );
}
