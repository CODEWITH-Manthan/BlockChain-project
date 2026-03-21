'use client';
import React, { useEffect } from 'react';
import { useProcurement } from '@/context/ProcurementContext';
import { useRouter } from 'next/navigation';

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const { role } = useProcurement();
  const router = useRouter();

  useEffect(() => {
    if (role === null && typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('nexus_token');
      if (!storedToken) {
        router.push('/login');
      }
    }
  }, [role, router]);

  if (!role) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0d0f]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
