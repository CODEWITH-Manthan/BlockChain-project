import React from 'react';

export function ProgressBar({ progress }: { progress: number }) {
  const safeProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div 
        className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
        style={{ width: `${safeProgress}%` }}
      ></div>
    </div>
  );
}
