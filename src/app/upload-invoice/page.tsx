'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { useProcurement } from '@/hooks/useProcurement';
import { uploadFileToIPFS } from '@/utils/ipfs';

export default function UploadInvoicePage() {
  const { projects, addInvoice } = useProcurement();
  const [projectId, setProjectId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState('');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!projectId || !file || !amount) return alert("Select a project, file, and amount");
    try {
      setLoading(true);
      
      const ipfsHash = await uploadFileToIPFS(file);
      
      setHash(ipfsHash);
      addInvoice({
        id: `inv-${Date.now()}`,
        projectId,
        hash: ipfsHash,
        amount: parseFloat(amount),
        date: new Date().toISOString()
      });
      alert('File uploaded successfully to IPFS (via Pinata)!');
    } catch (error) {
      console.error(error);
      alert('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-white">Upload Invoice</h1>
      <Card className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl">
        <p className="text-gray-400 mb-6">Submit an invoice for an existing project milestone.</p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Select Project</label>
            <select 
              className="w-full bg-[#2c2c2f] text-white border-transparent rounded-md px-3 py-2 text-sm focus:ring-blue-500 outline-none"
              value={projectId} onChange={e => setProjectId(e.target.value)}
            >
              <option value="">-- Choose Project --</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Amount (₹)</label>
            <input 
              type="number" 
              className="w-full bg-[#2c2c2f] text-white border-transparent rounded-md px-3 py-2 text-sm focus:ring-blue-500 outline-none"
              placeholder="0.00"
              value={amount} onChange={e => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:bg-[#222225] transition-colors cursor-pointer relative bg-[#2c2c2f]">
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <div className="mt-4 flex text-sm text-gray-400 justify-center">
            <p className="font-medium text-blue-500 hover:text-blue-400">
              {file ? file.name : "Upload a file or drag and drop"}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">PDF, PNG, JPG up to 10MB</p>
        </div>

        {hash && (
          <div className="mt-4 p-4 bg-green-900/30 border border-green-800 text-green-400 rounded-md text-sm break-all">
            <strong>IPFS Hash:</strong> {hash}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button 
            type="button" 
            onClick={handleUpload}
            disabled={loading || !file || !projectId || !amount}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Submit Invoice'}
          </button>
        </div>
      </Card>
    </div>
  );
}
