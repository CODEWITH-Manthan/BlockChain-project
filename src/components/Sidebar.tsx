'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProcurement } from '@/context/ProcurementContext';
import {
  Aperture, LayoutDashboard, FileText, PlusSquare,
  Milestone, CreditCard, Bell, Settings, LogOut, User, ShieldCheck
} from 'lucide-react';

const navItems = [
  { href: '/dashboard',       icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/create-project',  icon: PlusSquare,      label: 'Create Project' },
  { href: '/upload-invoice',  icon: FileText,        label: 'Submit Logs' },
  { href: '/milestones',      icon: Milestone,       label: 'Milestones' },
  { href: '/payments',        icon: CreditCard,      label: 'Payments' },
  { href: '/audit',           icon: ShieldCheck,     label: 'Audit Portal' },
];

const bottomItems = [
  { href: '/profile',  icon: User,     label: 'Profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role, logout } = useProcurement();

  const visibleItems = navItems.filter(item => {
    if (role === 'ADMIN') return true;
    if (role === 'CONTRACTOR' && ['/dashboard', '/upload-invoice'].includes(item.href)) return true;
    if (role === 'REGULATOR' && ['/dashboard', '/audit'].includes(item.href)) return true;
    return false;
  });

  const linkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(href + '/');
    return `group relative p-3 rounded-[14px] transition-all flex items-center justify-center ${
      isActive
        ? 'bg-white text-black shadow-sm'
        : 'text-gray-400 hover:text-white hover:bg-[#222225]'
    }`;
  };

  return (
    <aside className="w-[88px] bg-[#151518] border-r border-[#222225] h-screen flex-shrink-0 flex flex-col items-center py-6 fixed inset-y-0 left-0 z-50">
      {/* Logo */}
      <div className="mb-8 relative w-full flex justify-center">
        <Link href="/" className="text-white hover:opacity-80 transition-opacity">
          <Aperture size={32} />
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 w-full flex flex-col items-center space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} className={linkClass(item.href)} title={item.label}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {/* Tooltip */}
              <span className="absolute left-full ml-3 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="mt-auto flex flex-col items-center space-y-2 pt-4 border-t border-[#222225] w-full">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`group relative ${linkClass(item.href)}`} title={item.label}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="absolute left-full ml-3 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </span>
            </Link>
          );
        })}
        <button onClick={logout} className="group relative p-3 text-gray-400 hover:text-white hover:bg-[#222225] rounded-2xl transition-colors" title="Log Out / Switch Role">
          <LogOut size={22} />
          <span className="absolute left-full ml-3 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
