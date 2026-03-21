'use client';

import { useProcurement } from '@/context/ProcurementContext';
import { Card } from '@/components/Card';
import { ActivityLog } from '@/components/ActivityLog';
import { Briefcase, DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { projects, milestones, profile, role } = useProcurement();

  const userProjects = role === 'ADMIN' 
    ? projects 
    : projects.filter(p => {
        const c = p.contractor?.toLowerCase().replace(/\s+/g, '') || '';
        const n = profile?.name?.toLowerCase().replace(/\s+/g, '') || '';
        return c === n || c.includes(n) || n.includes(c);
      });

  const userProjectIds = userProjects.map(p => p.id);
  const userMilestones = milestones.filter(m => userProjectIds.includes(m.projectId));

  const totalBudget = userProjects.reduce((acc, p) => acc + p.budget, 0);
  const completedMilestones = userMilestones.filter(m => m.status === 'Paid' || m.status === 'Approved').length;
  const pendingPaymentsAmount = userMilestones.filter(m => m.status === 'Approved').reduce((acc, m) => acc + m.amount, 0);
  const receivedPaymentsAmount = userMilestones.filter(m => m.status === 'Paid').reduce((acc, m) => acc + m.amount, 0);

  const displayAmount = role === 'CONTRACTOR' ? receivedPaymentsAmount : pendingPaymentsAmount;
  const displayLabel = role === 'CONTRACTOR' ? 'Payments Received' : 'Pending Payments';

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
            <p className="text-3xl font-bold text-white tracking-tight">{userProjects.length}</p>
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
          <div className={`p-4 rounded-2xl mr-4 border ${role === 'CONTRACTOR' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
            {role === 'CONTRACTOR' ? <DollarSign className="text-emerald-400" size={24} /> : <Clock className="text-orange-400" size={24} />}
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">{displayLabel}</p>
            <p className="text-3xl font-bold text-white tracking-tight">₹{displayAmount.toLocaleString('en-IN')}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-[#1c1c1f] rounded-3xl p-6 border border-[#2c2c2f] h-full">
            <h2 className="text-lg font-medium text-white mb-6">Recent Projects</h2>
            {userProjects.length === 0 ? (
              <p className="text-gray-500 text-sm">No projects assigned yet.</p>
            ) : (
              <ul className="space-y-4">
                {[...userProjects].reverse().slice(0, 5).map(p => (
                  <li key={p.id} className="bg-[#151518] border border-[#2c2c2f] p-5 rounded-2xl flex justify-between items-center hover:border-gray-700 transition-colors">
                    <div>
                      <p className="text-white font-medium text-lg">{p.name}</p>
                      <div className="flex items-center space-x-3 mt-1.5">
                        <p className="text-gray-500 text-xs">Contractor: <span className="text-gray-400">{p.contractor}</span></p>
                        {p.location && (
                          <>
                            <span className="text-gray-600 text-[10px]">•</span>
                            <p className="text-gray-500 text-xs">Location: <span className="text-gray-400">{p.location}</span></p>
                          </>
                        )}
                      </div>
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
