import React from 'react';

export function ProgressBar({ progress }: { progress: number }) {
  const safeProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${safeProgress}%` }}
      ></div>
    </div>
  );
}
