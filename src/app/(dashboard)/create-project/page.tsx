'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProcurement } from '@/context/ProcurementContext';
import { Card } from '@/components/Card';
import { PlusSquare, CheckCircle, FileText, UploadCloud } from 'lucide-react';

export default function CreateProjectPage() {
  const router = useRouter();
  const { addProject } = useProcurement();
  const [formData, setFormData] = useState({ name: '', budget: '', contractor: '' });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate Initial Document genesis hash
    const docHash = file ? "0x" + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) : undefined;

    addProject({
      id: `proj-${Date.now()}`,
      name: formData.name,
      budget: Number(formData.budget),
      contractor: formData.contractor,
      documentHash: docHash
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', budget: '', contractor: '' });
      setFile(null);
      router.push('/milestones');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Create Project</h1>
        <p className="text-gray-400">Initialize a new infrastructure procurement project on the ledger.</p>
      </div>

      <Card className="bg-[#1c1c1f] border-[#2c2c2f] p-8 mt-6">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-300">
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Project Created Successfully</h3>
            <p className="text-gray-400">The project is now registered locally.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Project Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#151518] border border-[#333336] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. City Bridge Expansion"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Allocated Budget (₹)</label>
              <input 
                required
                type="number" 
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
                className="w-full bg-[#151518] border border-[#333336] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="1000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Contractor Details</label>
              <input 
                required
                type="text" 
                value={formData.contractor}
                onChange={e => setFormData({...formData, contractor: e.target.value})}
                className="w-full bg-[#151518] border border-[#333336] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Contractor Name or Address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Initial Genesis Documents (Optional)</label>
              <label className="border-2 border-dashed border-[#333336] rounded-xl p-6 hover:bg-[#222225] transition-colors cursor-pointer flex flex-col items-center justify-center group w-full">
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                
                {file ? (
                  <div className="flex flex-col items-center text-blue-400">
                    <FileText size={28} className="mb-3" />
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Ready for genesis hashing</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="text-gray-500 group-hover:text-blue-400 transition-colors mb-3" size={28} />
                    <p className="text-sm text-gray-400"><span className="text-blue-400 font-medium">Click to browse</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">Upload permits or proposals for chain storage</p>
                  </>
                )}
              </label>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full flex justify-center items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
              >
                <PlusSquare size={18} />
                <span>Initialize Project</span>
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
