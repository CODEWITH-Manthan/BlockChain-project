import React from 'react';

type BadgeStatus = 'Pending' | 'Approved' | 'Paid' | string;

export function Badge({ status }: { status: BadgeStatus }) {
  let colorClass = 'bg-gray-100 text-gray-800 border-gray-200'; // default
  
  if (status === 'Pending') colorClass = 'bg-red-500/20 text-red-500 border-red-800'; // Red = blocked
  if (status === 'Approved') colorClass = 'bg-green-500/20 text-green-500 border-green-800'; // Green = approved
  if (status === 'Paid') colorClass = 'bg-emerald-500/20 text-emerald-500 border-emerald-800';

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {status}
    </span>
  );
}
