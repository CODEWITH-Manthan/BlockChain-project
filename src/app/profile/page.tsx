'use client';
import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { useProcurement } from '@/hooks/useProcurement';

export default function ProfilePage() {
  const { profile, updateProfile } = useProcurement();
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [wallet, setWallet] = useState(profile.wallet);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, role, wallet });
    alert('Profile Updated Successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <h1 className="text-2xl font-semibold text-white">Your Profile</h1>
      <Card className="bg-[#1c1c1f] border-gray-800 p-6 rounded-3xl">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-[#2c2c2f] text-white rounded-md px-3 py-2 text-sm outline-none"
              value={name} onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
            <input 
              type="text" 
              className="w-full bg-[#2c2c2f] text-white rounded-md px-3 py-2 text-sm outline-none"
              value={role} onChange={e => setRole(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Linked Wallet Address</label>
            <input 
              type="text" 
              className="w-full bg-[#2c2c2f] text-white rounded-md px-3 py-2 text-sm outline-none"
              value={wallet} onChange={e => setWallet(e.target.value)}
            />
          </div>
          <div className="pt-4 flex justify-end">
             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
               Save Profile
             </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
