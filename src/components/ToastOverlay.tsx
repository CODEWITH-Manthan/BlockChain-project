'use client';

import React, { useEffect, useState } from 'react';
import { useProcurement } from '@/hooks/useProcurement';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { AppNotification } from '@/types';

export function ToastOverlay() {
  const { notifications } = useProcurement();
  const [activeToasts, setActiveToasts] = useState<AppNotification[]>([]);

  useEffect(() => {
    // Show only the latest 3 notifications that are newer than 5 seconds
    const now = Date.now();
    const recent = notifications
      .filter(n => now - new Date(n.timestamp).getTime() < 5000)
      .slice(0, 3);
    setActiveToasts(recent);
  }, [notifications]);

  if (activeToasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none">
      {activeToasts.map(toast => {
        const isError = toast.message.toLowerCase().includes('failed') || toast.message.toLowerCase().includes('error');
        const isChain = toast.message.toLowerCase().includes('chain') || toast.message.toLowerCase().includes('tx:');
        
        return (
          <div 
            key={toast.id} 
            className={`flex items-start space-x-3 p-4 rounded-xl shadow-lg border animate-in slide-in-from-bottom-5 fade-in duration-300 w-80 pointer-events-auto
              ${isError ? 'bg-red-950/90 border-red-900 text-red-200' : 
                isChain ? 'bg-[#1e1a2e]/90 border-purple-900 text-purple-200' : 
                'bg-[#1a1c1d]/90 border-gray-800 text-white'}`}
          >
            <div className="shrink-0 mt-0.5">
              {isError ? <XCircle size={18} className="text-red-400" /> : 
               isChain ? <CheckCircle size={18} className="text-purple-400" /> : 
               <Info size={18} className="text-blue-400" />}
            </div>
            <div>
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
              {isChain && toast.message.includes('TX:') && (
                <button className="text-xs text-purple-400 hover:text-purple-300 mt-2 font-mono bg-purple-900/30 px-2 py-1 rounded transition-colors">
                  View on Explorer ↗
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
