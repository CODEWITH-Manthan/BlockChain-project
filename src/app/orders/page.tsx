'use client';

import React from 'react';
import { Search, Upload, SlidersHorizontal, Plus, Filter, X, ChevronLeft, ChevronRight, MoreHorizontal, TrendingUp, TrendingDown, Square, ChevronDown } from 'lucide-react';

const orderData = Array(8).fill({
  orderNumber: 'Nº674839',
  customerName: 'Kris Payer',
  customerPhone: '099 758 9092',
  category: 'Laptops',
  price: '$ 1302,38',
  date: '26.07.2024',
  payment: 'PayPal',
});

export default function OrdersPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-20">
      <h1 className="text-3xl font-semibold tracking-tight text-white mb-6">Order list</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* New orders - Blue */}
        <div className="bg-[#8baef8] rounded-3xl p-6 relative overflow-hidden text-black shadow-sm">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <span className="text-sm font-medium">New orders</span>
            <div className="flex flex-col mt-4">
              <div className="flex items-end space-x-3">
                <span className="text-4xl font-bold tracking-tight">12</span>
                <span className="flex items-center text-[10px] font-bold text-black bg-white/40 px-2 py-0.5 rounded-full mb-1">
                  <TrendingUp size={10} className="mr-1" strokeWidth={3} /> 2.67%
                </span>
              </div>
              <p className="text-xs mt-1 text-black/60 font-medium">Than last week</p>
            </div>
          </div>
        </div>

        {/* Await accepting orders - Orange */}
        <div className="bg-[#ffad71] rounded-3xl p-6 relative overflow-hidden text-black shadow-sm">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <span className="text-sm font-medium">Await accepting orders</span>
            <div className="flex flex-col mt-4">
              <div className="flex items-end space-x-3">
                <span className="text-4xl font-bold tracking-tight">20</span>
                <span className="flex items-center text-[10px] font-bold text-black bg-white/40 px-2 py-0.5 rounded-full mb-1">
                  <TrendingUp size={10} className="mr-1" strokeWidth={3} /> 2.67%
                </span>
              </div>
              <p className="text-xs mt-1 text-black/60 font-medium">Than last week</p>
            </div>
          </div>
        </div>

        {/* On way orders - Yellow */}
        <div className="bg-[#ffe47a] rounded-3xl p-6 relative overflow-hidden text-black shadow-sm">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <span className="text-sm font-medium">On way orders</span>
            <div className="flex flex-col mt-4">
              <div className="flex items-end space-x-3">
                <span className="text-4xl font-bold tracking-tight">57</span>
                <span className="flex items-center text-[10px] font-bold text-black bg-white/40 px-2 py-0.5 rounded-full mb-1">
                  <TrendingDown size={10} className="mr-1" strokeWidth={3} /> 0.61%
                </span>
              </div>
              <p className="text-xs mt-1 text-black/60 font-medium">Than last week</p>
            </div>
          </div>
        </div>

        {/* Delivered orders - Green */}
        <div className="bg-[#8beeb0] rounded-3xl p-6 relative overflow-hidden text-black shadow-sm">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <span className="text-sm font-medium">Delivered orders</span>
            <div className="flex flex-col mt-4">
              <div className="flex items-end space-x-3">
                <span className="text-4xl font-bold tracking-tight">98</span>
                <span className="flex items-center text-[10px] font-bold text-black bg-white/40 px-2 py-0.5 rounded-full mb-1">
                  <TrendingUp size={10} className="mr-1" strokeWidth={3} /> 2.87%
                </span>
              </div>
              <p className="text-xs mt-1 text-black/60 font-medium">Than last week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-[#1c1c1f] rounded-[14px] px-4 py-2 w-[340px] border border-transparent focus-within:border-gray-600 transition-colors">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 ml-3 w-full" />
          </div>
          <span className="text-sm text-gray-500"><span className="text-white font-medium">180</span> orders</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white transition px-3 py-2">
            <Upload size={18} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#1c1c1f] text-sm font-medium text-gray-300 hover:text-white transition px-4 py-2.5 rounded-xl border border-transparent hover:border-[#2c2c2f]">
            <SlidersHorizontal size={16} />
            <span>Sort: default</span>
          </button>
          <button className="flex items-center space-x-2 bg-white text-black text-sm font-medium hover:bg-gray-200 shadow-sm transition px-5 py-2.5 rounded-[14px]">
            <Plus size={18} />
            <span>Add order</span>
          </button>
        </div>
      </div>

      {/* Filters and Pagination */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 border border-transparent hover:border-[#222225] rounded-xl text-gray-400 hover:text-white transition mr-2 bg-[#1c1c1f]">
            <Filter size={16} />
          </button>
          <div className="flex items-center space-x-2 bg-[#2c2c2f] px-3 py-1.5 rounded-xl text-xs text-white">
            <span>Laptops</span>
            <button className="ml-1.5 hover:bg-gray-600 rounded-full p-0.5 transition"><X size={12} /></button>
          </div>
          <div className="flex items-center space-x-2 bg-[#2c2c2f] px-3 py-1.5 rounded-xl text-xs text-white">
            <span>PayPal</span>
            <button className="ml-1.5 hover:bg-gray-600 rounded-full p-0.5 transition"><X size={12} /></button>
          </div>
          <button className="text-xs text-gray-400 hover:text-white transition ml-3 bg-transparent font-medium">Clear all (2)</button>
        </div>
        <div className="flex items-center space-x-4 text-xs font-medium text-gray-400">
          <span>1 of 18</span>
          <div className="flex space-x-1">
            <button className="p-2 border border-transparent hover:border-[#222225] bg-[#1c1c1f] rounded-xl transition text-gray-500"><ChevronLeft size={14} /></button>
            <button className="p-2 border border-transparent hover:border-[#222225] bg-[#1c1c1f] rounded-xl transition text-white"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1f] rounded-[24px] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2c2c2f] text-[10px] uppercase text-gray-500 tracking-wider">
              <th className="px-6 py-5 font-medium w-12 text-center">
                 <Square size={16} className="text-gray-600 mx-auto" />
              </th>
              <th className="px-6 py-5 font-medium">Order Number</th>
              <th className="px-6 py-5 font-medium">Customer</th>
              <th className="px-6 py-5 font-medium">Category</th>
              <th className="px-6 py-5 font-medium">Price</th>
              <th className="px-6 py-5 font-medium">Date</th>
              <th className="px-6 py-5 font-medium">Payment</th>
              <th className="px-6 py-5 font-medium">Status</th>
              <th className="px-6 py-5 font-medium w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2c2c2f] text-[13px] text-gray-300">
            {orderData.map((order, i) => {
              const statusOptions = ['on way', 'delivered', 'await'];
              const status = statusOptions[i % 3];
              
              let statusBg = '';
              let statusText = '';
              if (status === 'on way') { statusBg = 'bg-[#6b588c]/20'; statusText = 'text-[#b19be5]'; }
              if (status === 'delivered') { statusBg = 'bg-[#4e8e6e]/20'; statusText = 'text-[#7fe8a3]'; }
              if (status === 'await') { statusBg = 'bg-[#8c4856]/20'; statusText = 'text-[#f8788a]'; }

              return (
                <tr key={i} className="hover:bg-[#222225] transition-colors group">
                  <td className="px-6 py-4 text-center">
                    <Square size={16} className="text-gray-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                       <span className="w-8 h-8 rounded-lg border border-[#333336] flex items-center justify-center text-xs opacity-60">📄</span>
                       <span>{order.orderNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white mb-0.5">{order.customerName}</span>
                      <span className="text-[11px] text-gray-500">{order.customerPhone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{order.category}</td>
                  <td className="px-6 py-4">{order.price}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">{order.payment}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide space-x-1 ${statusBg} ${statusText}`}>
                      <span>{status}</span>
                      <ChevronDown size={12} className="ml-1.5 opacity-80" strokeWidth={2.5} />
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 group-hover:text-white cursor-pointer transition-colors text-right">
                    <MoreHorizontal size={18} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
