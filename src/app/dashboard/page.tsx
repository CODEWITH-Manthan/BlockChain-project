'use client';

import React from 'react';
import { ArrowUpRight, TrendingUp, TrendingDown, ChevronDown, Check } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, YAxis, XAxis, PieChart, Pie, Cell } from 'recharts';

const barData = [
  { name: '1 AUG', uv: 15000 },
  { name: '2 AUG', uv: 9000 },
  { name: '3 AUG', uv: 10000 },
  { name: '4 AUG', uv: 17000 },
  { name: '5 AUG', uv: 12000 },
  { name: '6 AUG', uv: 21000 },
  { name: '7 AUG', uv: 18000 },
  { name: '8 AUG', uv: 24000 },
];

const pieData = [
  { name: 'Apple MacBook Air M2', value: 25, color: '#f97316' },
  { name: 'Apple Watch Series 9', value: 25, color: '#3b82f6' },
  { name: 'Acoustics JBL Charge 5', value: 10, color: '#eab308' },
  { name: 'Acoustics Divoom SongBird-HQ', value: 15, color: '#ef4444' },
  { name: 'Apple AirPods Pro 2', value: 25, color: '#22c55e' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Hello, Barbara! <span className="text-2xl">👋</span></h1>
          <p className="text-sm text-gray-400">This is what's happening in your store this month.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#1c1c1f] hover:bg-[#222225] text-sm text-gray-300 px-4 py-2 rounded-xl transition-colors">
          <span>This month</span>
          <ChevronDown size={16} className="text-gray-500 ml-2" />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 pt-4">
        {/* Left column containing 4 summary cards */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
          
          {/* Total Revenue */}
          <div className="col-span-2 sm:col-span-1 bg-white rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-medium text-gray-600">Total revenue</span>
              <button className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/30">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div>
              <div className="flex flex-wrap items-end space-x-2 mb-2">
                <span className="text-3xl font-bold text-black tracking-tight">$ 99.560</span>
                <span className="flex items-center text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full mb-1">
                  <TrendingUp size={12} className="mr-1" strokeWidth={3} /> 2.67%
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">This month vs last</p>
            </div>
          </div>

          {/* Total Orders */}
          <div className="col-span-2 sm:col-span-1 bg-[#1c1c1f] rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-medium text-gray-300">Total orders</span>
              <button className="bg-[#2c2c2f] p-2 rounded-full text-gray-400 hover:text-white transition">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div>
              <div className="flex flex-wrap items-end space-x-2 mb-2">
                <span className="text-3xl font-bold text-white tracking-tight">35</span>
                <span className="flex items-center text-xs font-semibold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full mb-1">
                  <TrendingDown size={12} className="mr-1" strokeWidth={3} /> 2.6%
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">This month vs last</p>
            </div>
          </div>

          {/* Total Visitors */}
          <div className="col-span-2 sm:col-span-1 bg-[#1c1c1f] rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-medium text-gray-300">Total visitors</span>
              <button className="bg-[#2c2c2f] p-2 rounded-full text-gray-400 hover:text-white transition">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div>
              <div className="flex flex-wrap items-end space-x-2 mb-2">
                <span className="text-3xl font-bold text-white tracking-tight">45.600</span>
                <span className="flex items-center text-xs font-semibold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full mb-1">
                  <TrendingDown size={12} className="mr-1" strokeWidth={3} /> 2.6%
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">This month vs last</p>
            </div>
          </div>

          {/* Net Profit */}
          <div className="col-span-2 sm:col-span-1 bg-[#1c1c1f] rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-medium text-gray-300">Net profit</span>
              <button className="bg-[#2c2c2f] p-2 rounded-full text-gray-400 hover:text-white transition">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div>
              <div className="flex flex-wrap items-end space-x-2 mb-2">
                <span className="text-3xl font-bold text-white tracking-tight">$ 60.450</span>
                <span className="flex items-center text-xs font-semibold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full mb-1">
                  <TrendingUp size={12} className="mr-1" strokeWidth={3} /> 5.67%
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">This month vs last</p>
            </div>
          </div>
          
        </div>

        {/* Right column: Revenue Chart */}
        <div className="col-span-12 lg:col-span-7 bg-[#1c1c1f] rounded-3xl p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-baseline space-x-3">
              <h2 className="text-lg font-medium text-white">Revenue</h2>
              <span className="text-xs text-gray-500">This month vs last</span>
            </div>
            <button className="bg-white p-2 rounded-full text-black hover:bg-gray-200 transition">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </button>
          </div>
          <div className="h-[220px] mt-2 text-xs font-sans">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={0}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  tickFormatter={(val) => `$ ${val.toLocaleString()}`}
                  ticks={[0, 5000, 10000, 15000, 20000, 25000]}
                />
                <Tooltip 
                  cursor={{fill: '#2a2c2e'}}
                  contentStyle={{ backgroundColor: '#2c2c2f', border: 'none', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="uv" fill="#75a5ff" radius={[4, 4, 4, 4]} barSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Orders and Customers connected cards */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 rounded-3xl overflow-hidden relative border border-[#222225] bg-[#1c1c1f]">
          <div className="bg-[#151518] w-9 h-9 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-1 z-10 border border-[#222225]">
            <button className="bg-white text-black p-1 rounded-full w-full h-full flex items-center justify-center hover:bg-gray-200 transition">
               <ArrowUpRight size={16} strokeWidth={3} className="ml-0.5" />
            </button>
          </div>
          
          <div className="p-8 flex flex-col justify-between">
            <div className="bg-[#2c2c2f] w-12 h-12 rounded-full flex items-center justify-center mb-8">
              <Check size={22} className="text-gray-400" />
            </div>
            <div className="mt-8">
               <div className="flex items-baseline space-x-2">
                 <span className="text-[40px] font-bold text-white tracking-tight leading-none">98</span>
                 <span className="text-lg text-gray-400">orders</span>
               </div>
               <p className="text-xs text-gray-500 mt-3 leading-relaxed">12 orders <span className="text-red-400">are awaiting</span> confirmation.</p>
            </div>
          </div>
          
          <div className="p-8 flex flex-col justify-between border-l border-[#222225]">
            <div className="bg-[#2c2c2f] w-12 h-12 rounded-full flex items-center justify-center mb-8">
              {/* User icon placeholder represented by circle */}
              <div className="w-4 h-4 rounded-full bg-gray-400 mb-2"></div>
              <div className="w-6 h-3 rounded-full bg-gray-400 absolute mt-4 clip-bottom"></div>
            </div>
            <div className="mt-8">
               <div className="flex items-baseline space-x-2">
                 <span className="text-[40px] font-bold text-white tracking-tight leading-none">17</span>
                 <span className="text-lg text-gray-400">customers</span>
               </div>
               <p className="text-xs text-gray-500 mt-3 leading-relaxed">17 customers <span className="text-red-400">are waiting</span> for response.</p>
            </div>
          </div>
        </div>

        {/* Sales by category Pie Chart */}
        <div className="col-span-12 lg:col-span-7 bg-[#1c1c1f] rounded-3xl p-6 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-baseline space-x-3">
              <h2 className="text-lg font-medium text-white">Sales by Category</h2>
              <span className="text-xs text-gray-500">This month vs last</span>
            </div>
            <button className="bg-white p-2 rounded-full text-black hover:bg-gray-200 transition">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center mt-6">
             <div className="w-full sm:w-1/2 h-56">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={pieData}
                     innerRadius={65}
                     outerRadius={95}
                     paddingAngle={3}
                     dataKey="value"
                     stroke="none"
                   >
                     {pieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#2c2c2f', border: 'none', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     itemStyle={{ color: '#fff' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="w-full sm:w-1/2 flex flex-col justify-center space-y-4 sm:pl-4 mt-6 sm:mt-0">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <span className="w-2.5 h-2.5 rounded-full mr-3 shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
