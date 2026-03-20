import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function PaymentsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Payments Ledger</h1>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#TXN-8930</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">City Bridge</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">$250,000</td>
                <td className="px-6 py-4 whitespace-nowrap"><Badge status="Paid" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Mar 15, 2026</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#TXN-8931</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Highway 61</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">$45,000</td>
                <td className="px-6 py-4 whitespace-nowrap"><Badge status="Pending" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Mar 19, 2026</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#TXN-8932</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Public Library</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">$12,000</td>
                <td className="px-6 py-4 whitespace-nowrap"><Badge status="Approved" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Mar 20, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
