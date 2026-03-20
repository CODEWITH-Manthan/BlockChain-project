'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Aperture, LayoutDashboard, FileText, Grid, Users, Monitor, Circle, LogOut } from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard },
  { href: '/orders', icon: FileText },
  { href: '/create-project', icon: Grid },
  { href: '/milestones', icon: Users },
  { href: '/payments', icon: Monitor },
  { href: '#', icon: Circle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[88px] bg-[#151518] border-r border-[#222225] h-screen flex-shrink-0 flex flex-col items-center py-6 fixed inset-y-0 left-0 z-50">
      <div className="mb-8 relative w-full flex justify-center">
        <Link href="/" className="text-white hover:opacity-80 transition-opacity">
          <Aperture size={32} />
        </Link>
        {/* Decorative toggle handle */}
        <div className="absolute -right-3 top-1 bg-[#222225] rounded-md p-1 cursor-pointer hover:bg-gray-700">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m13 17 5-5-5-5M6 17l5-5-5-5"/></svg>
        </div>
      </div>
      <nav className="flex-1 w-full flex flex-col items-center space-y-4">
        {navItems.map((item, index) => {
          // If the item href is '#', it's just a placeholder icon
          if (item.href === '#') return (
            <div key={index} className="p-3 rounded-2xl text-gray-500 cursor-default mt-4">
              <item.icon size={22} strokeWidth={2} />
            </div>
          )

          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={`p-3 rounded-[14px] transition-all flex items-center justify-center ${
                isActive 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-[#222225]'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4">
        <button className="p-3 text-gray-400 hover:text-white hover:bg-[#222225] rounded-2xl transition-colors">
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
}
