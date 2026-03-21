'use client';
import React from 'react';
import { Card } from '@/components/Card';
import { useProcurement } from '@/hooks/useProcurement';

export default function NotificationsPage() {
  const { notifications } = useProcurement();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <h1 className="text-2xl font-semibold text-white">Notifications</h1>
      <Card className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map(n => (
              <li key={n.id} className="bg-[#2c2c2f] p-4 rounded-xl flex items-start justify-between border border-gray-800">
                <span className="text-white text-sm">{n.message}</span>
                <span className="text-gray-500 text-xs ml-4 whitespace-nowrap">
                  {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
