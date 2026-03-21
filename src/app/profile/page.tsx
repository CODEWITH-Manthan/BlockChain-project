'use client';
import React, { useState } from 'react';
import { useProcurement } from '@/context/ProcurementContext';
import { Card } from '@/components/Card';
import { User, Wallet, ShieldCheck, HardHat, Eye, Save, Key } from 'lucide-react';

export default function ProfilePage() {
  const { role, profile, updateProfile, addLog } = useProcurement();
  const [formData, setFormData] = useState({
    name: profile.name,
    wallet: profile.wallet
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      wallet: formData.wallet
    });
    addLog(`User Profile Updated: ${formData.name}`);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderRoleBadge = () => {
    switch(role) {
      case 'ADMIN':
        return (
          <div className="flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/20 w-fit">
            <ShieldCheck size={18} />
            <span className="font-semibold text-sm">Government Admin</span>
          </div>
        );
      case 'CONTRACTOR':
        return (
          <div className="flex items-center space-x-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-xl border border-orange-500/20 w-fit">
            <HardHat size={18} />
            <span className="font-semibold text-sm">Contractor / Supplier</span>
          </div>
        );
      case 'REGULATOR':
        return (
          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20 w-fit">
            <Eye size={18} />
            <span className="font-semibold text-sm">Auditor / Regulator</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">User Profile</h1>
        <p className="text-gray-400">Manage your identity and Web3 wallet address bindings.</p>
      </div>

      <div className="mt-8 mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Current Authorization</h3>
        {renderRoleBadge()}
      </div>

      <Card className="bg-[#1c1c1f] border-[#2c2c2f] p-8 relative overflow-hidden">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
              <User size={16} className="text-gray-400" />
              <span>Full Name / Organization</span>
            </label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#151518] border border-[#333336] rounded-xl px-4 py-3 text-sm text-white focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="e.g. Apex Construction LLC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
              <Wallet size={16} className="text-gray-400" />
              <span>Web3 Wallet Address (Public Key)</span>
            </label>
            <div className="relative">
              <input 
                required
                type="text" 
                value={formData.wallet}
                onChange={e => setFormData({...formData, wallet: e.target.value})}
                className="w-full bg-[#151518] border border-[#333336] rounded-xl pl-11 pr-4 py-3 text-sm text-white font-mono focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="0x..."
              />
              <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">This address is used to cryptographically sign network transactions.</p>
          </div>

          <div className="pt-4 border-t border-[#2c2c2f] flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Changes are saved locally securely.
            </p>
            
            <div className="flex items-center space-x-4">
              {saved && (
                <span className="text-sm font-medium text-green-400 animate-in fade-in duration-300">
                  Profile updated successfully!
                </span>
              )}
              <button 
                type="submit" 
                className="flex items-center space-x-2 bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-white/5 active:scale-95"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

        </form>
      </Card>
    </div>
  );
}
