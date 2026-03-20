'use client';
import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { useProcurement } from '@/hooks/useProcurement';

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useProcurement();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <h1 className="text-2xl font-semibold text-white">Material Orders</h1>
      
      <Card className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl">
        <h3 className="text-lg font-medium text-white mb-6">Recent Procurement Requests</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#2c2c2f]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c2c2f]">
              {orders.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No orders placed currently.</td></tr>
              )}
              {orders.map(o => (
                <tr key={o.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{o.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{o.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400 font-medium">₹{o.cost.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge status={o.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    {o.status === 'Pending' && (
                      <button 
                        onClick={() => updateOrderStatus(o.id, 'Approved')}
                        className="bg-green-600/20 text-green-500 hover:bg-green-600/30 border border-green-800 px-3 py-1 rounded font-medium text-xs transition"
                      >
                        Approve
                      </button>
                    )}
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
