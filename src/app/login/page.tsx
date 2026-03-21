'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProcurement } from '@/context/ProcurementContext';
import { Shield, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { UserRole } from '@/types';
import { connectWallet } from '@/utils/blockchain';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useProcurement();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMsg('Registration successful. Please log in.');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Success -> Save token and update context
      localStorage.setItem('nexus_token', data.token);
      login(data.user.role as UserRole, data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMetaMaskConnect = async () => {
    setError('');
    setLoading(true);
    try {
      const wallet = await connectWallet();
      
      const res = await fetch('http://localhost:5000/api/auth/wallet-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Wallet login failed');
      }

      localStorage.setItem('nexus_token', data.token);
      login(data.user.role as UserRole, data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/logo.png" 
            alt="Aphelion Logo" 
            className="h-24 w-auto object-contain brightness-110 contrast-125 logo-mask drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
          />
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Sign in to Aphelion</h2>
        <p className="mt-2 text-sm text-gray-400">
          Welcome back to the decentralized procurement network.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1c1c1f] py-8 px-4 shadow-2xl sm:rounded-3xl border border-[#2c2c2f] sm:px-10">

          {successMsg && (
            <div className="mb-4 bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-xl flex items-center">
              <span>{successMsg}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl flex items-center">
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-[#333336] rounded-xl bg-[#151518] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded bg-[#151518]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-[#1c1c1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333336]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1c1c1f] text-gray-500">Or connect with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  onClick={handleMetaMaskConnect}
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-[#333336] rounded-xl shadow-sm bg-[#151518] text-sm font-medium text-gray-300 hover:bg-[#222225] transition-colors disabled:opacity-50"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="h-5 w-5 mr-2" />
                  MetaMask
                </button>
              </div>
              <div>
                <Link
                  href="/register"
                  className="w-full h-full flex justify-center items-center py-3 px-4 border border-[#333336] rounded-xl shadow-sm bg-[#151518] text-sm font-medium text-gray-300 hover:bg-[#222225] transition-colors"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="w-full flex-1 min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <Suspense fallback={<div className="text-center text-purple-400 mt-20">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
