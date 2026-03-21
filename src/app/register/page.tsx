'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProcurement } from '@/context/ProcurementContext';
import { Shield, Mail, Lock, User, Briefcase, FileBadge2, Wallet } from 'lucide-react';
import Link from 'next/link';
import { connectWallet } from '@/utils/blockchain';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CONTRACTOR',
    wallet: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConnectWallet = async () => {
    setError('');
    try {
      const wallet = await connectWallet();
      setFormData(prev => ({ ...prev, wallet }));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Success -> Redirect to login
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/logo.png" 
            alt="Aphelion Logo" 
            className="h-24 w-auto object-contain brightness-110 contrast-125 logo-mask drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
          />
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Join Aphelion Cluster</h2>
        <p className="mt-2 text-sm text-gray-400">
          Register to access transparent procurement & auditing.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1c1c1f] py-8 px-4 shadow-2xl sm:rounded-3xl border border-[#2c2c2f] sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl flex items-center">
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                I am registering as a
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                </div>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-[#333336] rounded-xl bg-[#151518] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="CONTRACTOR">Contractor / Vendor</option>
                  <option value="ADMIN">Authority / Government Official</option>
                  <option value="REGULATOR">Auditor / Regulator</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Organization / Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-[#333336] rounded-xl bg-[#151518] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder={formData.role === 'CONTRACTOR' ? "Vendor Name" : "Official Name"}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-[#333336] rounded-xl bg-[#151518] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="admin@aphelion.in"
                />
              </div>
            </div>

            <div>
              <label htmlFor="wallet" className="block text-sm font-medium text-gray-300">
                Wallet Address <span className="text-gray-500 text-xs">(Optional for now)</span>
              </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileBadge2 className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="wallet"
                      name="wallet"
                      type="text"
                      value={formData.wallet}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-[#333336] rounded-xl bg-[#151518] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="0x..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleConnectWallet}
                    className="flex items-center justify-center px-4 border border-[#333336] rounded-xl bg-[#151518] text-gray-400 hover:text-white hover:bg-[#222225] transition-all"
                    title="Connect MetaMask"
                  >
                    <Wallet className="h-5 w-5" />
                  </button>
                </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-[#333336] rounded-xl bg-[#151518] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-[#1c1c1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333336]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1c1c1f] text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link 
                href="/login"
                className="w-full flex justify-center py-3 px-4 border border-[#333336] rounded-xl shadow-sm text-sm font-medium text-gray-300 bg-[#151518] hover:bg-[#222225] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-[#1c1c1f] transition-colors"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
