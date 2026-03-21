'use client';

import { useProcurement } from '@/context/ProcurementContext';
import { Card } from '@/components/Card';
import { ActivityLog } from '@/components/ActivityLog';
import { Briefcase, DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { projects, milestones, profile } = useProcurement();

  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const completedMilestones = milestones.filter(m => m.status === 'Paid' || m.status === 'Approved').length;
  const pendingPaymentsAmount = milestones.filter(m => m.status === 'Approved').reduce((acc, m) => acc + m.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Hello, {profile?.name || 'Admin'}! <span className="text-2xl">👋</span></h1>
          <p className="text-sm text-gray-400">Overview of your infrastructure projects and fund disbursements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1c1c1f] border-[#2c2c2f] flex items-center p-6 rounded-3xl hover:border-gray-700 transition-colors">
          <div className="bg-blue-500/10 p-4 rounded-2xl mr-4 border border-blue-500/20">
            <Briefcase className="text-blue-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Total Projects</p>
            <p className="text-3xl font-bold text-white tracking-tight">{projects.length}</p>
          </div>
        </Card>

        <Card className="bg-[#1c1c1f] border-[#2c2c2f] flex items-center p-6 rounded-3xl hover:border-gray-700 transition-colors">
          <div className="bg-green-500/10 p-4 rounded-2xl mr-4 border border-green-500/20">
            <DollarSign className="text-green-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Total Budget</p>
            <p className="text-3xl font-bold text-white tracking-tight">₹{totalBudget.toLocaleString('en-IN')}</p>
          </div>
        </Card>

        <Card className="bg-[#1c1c1f] border-[#2c2c2f] flex items-center p-6 rounded-3xl hover:border-gray-700 transition-colors">
          <div className="bg-purple-500/10 p-4 rounded-2xl mr-4 border border-purple-500/20">
            <CheckCircle className="text-purple-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Completed Milestones</p>
            <p className="text-3xl font-bold text-white tracking-tight">{completedMilestones}</p>
          </div>
        </Card>

        <Card className="bg-[#1c1c1f] border-[#2c2c2f] flex items-center p-6 rounded-3xl hover:border-gray-700 transition-colors">
          <div className="bg-orange-500/10 p-4 rounded-2xl mr-4 border border-orange-500/20">
            <Clock className="text-orange-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Pending Payments</p>
            <p className="text-3xl font-bold text-white tracking-tight">₹{pendingPaymentsAmount.toLocaleString('en-IN')}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-[#1c1c1f] rounded-3xl p-6 border border-[#2c2c2f] h-full">
            <h2 className="text-lg font-medium text-white mb-6">Recent Projects</h2>
            {projects.length === 0 ? (
              <p className="text-gray-500 text-sm">No projects created yet. Use the Create Project page.</p>
            ) : (
              <ul className="space-y-4">
                {[...projects].reverse().slice(0, 5).map(p => (
                  <li key={p.id} className="bg-[#151518] border border-[#2c2c2f] p-5 rounded-2xl flex justify-between items-center hover:border-gray-700 transition-colors">
                    <div>
                      <p className="text-white font-medium text-lg">{p.name}</p>
                      <p className="text-gray-500 text-xs mt-1">Contractor: <span className="text-gray-400">{p.contractor}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold bg-green-500/10 px-4 py-2 rounded-xl">₹{p.budget.toLocaleString('en-IN')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}
