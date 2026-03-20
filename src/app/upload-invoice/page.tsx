import React from 'react';
import { Card } from '@/components/Card';

export default function UploadInvoicePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Upload Invoice</h1>
      <Card>
        <p className="text-slate-600 mb-6">Submit an invoice for an existing project milestone.</p>
        
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <div className="mt-4 flex text-sm text-slate-600 justify-center">
            <p className="font-medium text-blue-600 hover:text-blue-500">Upload a file</p>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-slate-500 mt-2">PDF, PNG, JPG up to 10MB</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="button" 
            className="bg-slate-900 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-slate-800 transition-colors"
          >
            Submit Invoice
          </button>
        </div>
      </Card>
    </div>
  );
}
