import React from 'react';
import { Search, Settings, Bell } from 'lucide-react';

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

      {/* Right side: Date and Actions */}
      <div className="flex items-center space-x-6">
        <span className="text-sm font-medium text-gray-300">Today, Mon 22 Nov</span>
        
        <div className="flex items-center space-x-3">
          <button className="p-2.5 bg-[#1c1d1f] hover:bg-[#222225] rounded-full text-gray-400 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
          <button className="p-2.5 bg-[#1c1d1f] hover:bg-[#222225] rounded-full text-gray-400 hover:text-white transition-colors relative">
            <Bell size={18} />
            {/* Notification dot */}
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-white rounded-full"></span>
          </button>
          <div className="h-10 w-10 ml-2 rounded-full overflow-hidden border-2 border-[#1c1d1f]">
            <img 
              src="https://i.pravatar.cc/150?img=47" 
              alt="User avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
