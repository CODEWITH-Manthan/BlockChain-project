import React from 'react';

type BadgeStatus = 'Pending' | 'Approved' | 'Paid' | string;

export function Badge({ status }: { status: BadgeStatus }) {
  let colorClass = 'bg-gray-100 text-gray-800 border-gray-200'; // default
  
  if (status === 'Pending') colorClass = 'bg-yellow-50 text-yellow-800 border-yellow-200';
  if (status === 'Approved') colorClass = 'bg-blue-50 text-blue-800 border-blue-200';
  if (status === 'Paid') colorClass = 'bg-green-50 text-green-800 border-green-200';

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {status}
    </span>
  );
}
