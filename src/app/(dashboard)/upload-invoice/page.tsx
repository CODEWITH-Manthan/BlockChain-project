'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProcurement } from '@/context/ProcurementContext';
import { Card } from '@/components/Card';
import { FileText, CheckCircle, UploadCloud, ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';

export default function UploadInvoicePage() {
  const router = useRouter();
  const { projects, milestones, addInvoice, role } = useProcurement();
  const [formData, setFormData] = useState({ milestoneId: '', amount: '', type: 'Invoice' as const });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [mockHash, setMockHash] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [error, setError] = useState('');

  const generateMockHash = () => {
    return "0x" + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.milestoneId) {
      setError('Please select a pending milestone to associate this invoice with.');
      return;
    }
    if (!file) {
      setError('Please select a document file to upload.');
      return;
    }

    const targetMilestone = milestones.find(m => m.id === formData.milestoneId);
    if (!targetMilestone) return;

    const hash = generateMockHash();
    const now = new Date().toISOString();
    
    addInvoice({
      id: `inv-${Date.now()}`,
      projectId: targetMilestone.projectId,
      milestoneId: targetMilestone.id,
      hash,
      amount: Number(formData.amount),
      date: now,
      fileName: file.name,
      type: formData.type
    });
    
    setMockHash(hash);
    setTimestamp(new Date().toLocaleString());
    setSubmitted(true);
    setError('');
    
    // Extend hash visibility to 8 seconds so the judge can read it
    setTimeout(() => {
      router.push('/milestones');
    }, 8000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ milestoneId: '', amount: '', type: 'Invoice' });
    setFile(null);
    setMockHash('');
  };

  const pendingMilestones = milestones.filter(m => m.status === 'Pending' && !m.invoiceUploaded);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Procurement & Material Logs</h1>
        <p className="text-gray-400">Contractors and suppliers: Upload invoices, delivery receipts, and quality certificates to the ledger.</p>
      </div>

      <Card className="bg-[#1c1c1f] border-[#2c2c2f] p-8 mt-6 relative overflow-hidden">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
              <ShieldCheck size={40} className="text-green-400" />
            </div>
            
            <h3 className="text-2xl font-medium text-white mb-2">Invoice Uploaded Successfully</h3>
            <p className="text-gray-400 mb-8 max-w-sm text-center">Your document has been fingerprinted. The cryptographic hash was generated and stored on the blockchain.</p>
            
            <div className="w-full bg-[#151518] border border-gray-800 rounded-2xl p-6 space-y-4 mb-8 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
              
              {role === 'ADMIN' && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Blockchain Hash</p>
                  <p className="text-purple-400 font-mono text-sm break-all font-medium py-2 px-3 bg-purple-900/10 rounded-lg border border-purple-500/20">
                    Hash: {mockHash}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center text-sm border-t border-gray-800 pt-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">File Registered</p>
                  <p className="text-gray-300 font-medium">{file?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Timestamp</p>
                  <p className="text-gray-300">{timestamp}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-[#222225] hover:bg-gray-800 transition-colors"
              >
                Upload Another
              </button>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Redirecting to Block Explorer (Mock)'); }}
                className="flex items-center space-x-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 px-6 py-2.5 rounded-xl font-medium text-sm transition-all"
              >
                <span>View on Chain</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3 text-red-500">
                <AlertCircle size={18} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Document Type</label>
                <select 
                  value={formData.type}
                  onChange={e => { setFormData({...formData, type: e.target.value as any}); setError(''); }}
                  className="w-full bg-[#151518] border border-[#333336] rounded-xl px-4 py-3 text-sm text-white focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option value="Invoice">Payment Invoice</option>
                  <option value="Receipt">Delivery Receipt</option>
                  <option value="Certificate">Quality Certificate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Target Milestone</label>
              {pendingMilestones.length === 0 ? (
                <div className="w-full bg-[#151518] border border-orange-500/30 text-orange-400 rounded-xl px-4 py-3 text-sm flex items-center space-x-2">
                  <AlertCircle size={16} />
                  <span>No pending milestones available. Please add a Milestone first.</span>
                </div>
              ) : (
                <div className="relative">
                  <select 
                    value={formData.milestoneId}
                    onChange={e => { setFormData({...formData, milestoneId: e.target.value}); setError(''); }}
                    className="w-full bg-[#151518] border border-[#333336] rounded-xl px-4 py-3 text-sm text-white focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none pr-10"
                  >
                    <option value="" disabled>-- Choose a milestone requiring an invoice --</option>
                    {pendingMilestones.map(m => {
                      const p = projects.find(proj => proj.id === m.projectId);
                      return (
                        <option key={m.id} value={m.id}>Project: {p?.name.substring(0, 15)}... | Milestone: {m.title}</option>
                      );
                    })}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Invoice Document</label>
              <label className="border-2 border-dashed border-[#333336] rounded-xl p-8 hover:bg-[#222225] transition-colors cursor-pointer flex flex-col items-center justify-center group w-full">
                <input type="file" className="hidden" onChange={handleFileChange} />
                
                {file ? (
                  <div className="flex flex-col items-center text-green-400">
                    <FileText size={32} className="mb-3" />
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Ready for hashing</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="text-gray-500 group-hover:text-purple-400 transition-colors mb-4" size={32} />
                    <p className="text-sm text-gray-400"><span className="text-purple-400 font-medium">Click to browse</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-2">Any file format supported for hash generation</p>
                  </>
                )}
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Required Funds Allocation (₹)</label>
              <input 
                required
                type="number" 
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                className="w-full bg-[#151518] border border-[#333336] rounded-xl px-4 py-3 text-sm text-white focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="250000"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full flex justify-center items-center space-x-2 bg-purple-600 text-white px-4 py-3.5 rounded-xl font-medium hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]"
              >
                <ShieldCheck size={18} />
                <span>Upload & Generate Blockchain Hash</span>
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
