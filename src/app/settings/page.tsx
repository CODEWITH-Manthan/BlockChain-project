'use client';
import React, { useState } from 'react';
import { Card } from '@/components/Card';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [network, setNetwork] = useState('sepolia');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>

      <Card className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl space-y-6">
        <h2 className="text-lg font-medium text-white border-b border-gray-800 pb-4">General Preferences</h2>

        {/* Notifications toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-200">Enable Notifications</p>
            <p className="text-xs text-gray-500">Receive alerts for approvals and payments</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Auto-approve toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-200">Auto-Approve Milestones</p>
            <p className="text-xs text-gray-500">Automatically approve on-chain verified milestones</p>
          </div>
          <button
            onClick={() => setAutoApprove(!autoApprove)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoApprove ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoApprove ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Network picker */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Blockchain Network</label>
          <select
            value={network}
            onChange={e => setNetwork(e.target.value)}
            className="w-full bg-[#2c2c2f] text-white rounded-md px-3 py-2 text-sm outline-none border border-gray-700"
          >
            <option value="sepolia">Sepolia Testnet</option>
            <option value="polygon">Polygon Mumbai</option>
            <option value="hardhat">Hardhat Local (127.0.0.1:8545)</option>
          </select>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {saved ? '✓ Saved!' : 'Save Settings'}
          </button>
        </div>
      </Card>
    </div>
  );
}
