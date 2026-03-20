'use client';

import React from 'react';
import { Search } from 'lucide-react';


export function Navbar() {
  return (
    <header className="bg-transparent h-20 flex items-center justify-between px-2 shrink-0 w-full mb-2">
      {/* Left side: Search */}
      <div className="flex-1 flex items-center">
        <div className="group flex items-center bg-[#1c1d1f] hover:bg-[#222225] border border-transparent focus-within:border-[#333336] transition-all rounded-full px-4 py-2.5 w-full max-w-sm">
          <Search size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 ml-3 w-full"
          />
        </div>
      </div>


    </header>
  );
}
