import React from 'react';
import { Card } from '@/components/Card';

export default function CreateProjectPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Create New Project</h1>
      <Card>
        <p className="text-slate-600 mb-6">Fill in the details below to initialize a new procurement project.</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. City Bridge Expansion"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Budget Allocation</label>
            <input 
              type="number" 
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="$0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea 
              rows={4}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Project description and scope..."
            ></textarea>
          </div>
          <div className="pt-4">
            <button 
              type="button" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Initialize Project
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
