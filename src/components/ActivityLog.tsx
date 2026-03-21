import React from 'react';
import { useProcurement } from '@/context/ProcurementContext';
import { Card } from '@/components/Card';
import { Activity, ExternalLink } from 'lucide-react';

export function ActivityLog() {
  const { logs, role } = useProcurement();

  return (
    <Card className="bg-[#1c1c1f] border-[#2c2c2f] p-6 rounded-3xl sticky top-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-500/10 p-2 rounded-xl text-blue-400">
          <Activity size={20} />
        </div>
        <h3 className="text-white font-medium text-lg">Immutable Audit Trail</h3>
      </div>
      
      {logs.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-6">No on-chain activity yet.</p>
      ) : (
        <div className="space-y-4">
          {logs.slice().reverse().map((log) => (
            <div key={log.id} className="relative pl-4 border-l-2 border-[#2c2c2f] pb-4 last:pb-0">
              <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full -left-[6px] top-1.5 ring-4 ring-[#1c1c1f]"></div>
              
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-mono text-gray-500">
                  [{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
                </span>
              </div>
              
              <p className="text-sm text-gray-300 font-medium leading-relaxed">{log.message}</p>
              
              {log.hash && role === 'ADMIN' && (
                <div className="mt-2 inline-flex items-center space-x-2 bg-[#151518] border border-[#333336] rounded px-2 py-1">
                  <span className="text-xs font-mono text-purple-400 truncate max-w-[150px]">
                    Hash: {log.hash}
                  </span>
                  <ExternalLink size={12} className="text-gray-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
