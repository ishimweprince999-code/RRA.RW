import { Link } from "react-router-dom";
import { LogOut, User, Menu, X, Settings, UserCircle, Bell, Search } from "lucide-react";
import { useState } from "react";
import useAuth from "../store/auth.js";
import useTheme from "../store/theme.js";

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { user, role, logout } = useAuth();
  const { theme } = useTheme();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 h-20 border-b border-slate-700/50 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 backdrop-blur-xl shadow-2xl">
      {/* Logo Section - Rwanda Flag Colors Accent */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all">
            <span className="text-white font-black text-2xl">ST</span>
          </div>
          {/* Rwanda flag colors indicator */}
          <div className="absolute -bottom-1 -right-1 flex gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="hidden md:block">
          <h1 className="font-black text-2xl bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent tracking-tight group-hover:from-blue-400 group-hover:to-yellow-300 transition-all">
            SmartTax
          </h1>
          <p className="text-xs text-slate-400 font-semibold tracking-wider">RWANDA REVENUE AUTHORITY</p>
        </div>
      </Link>
      
      {/* Center - Quick Actions (Desktop) */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="relative">
          <input 
            type="search" 
            placeholder="Search transactions..."
            className="w-64 px-4 py-2 pl-10 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Right - User Menu (Desktop) */}
      <div className="hidden md:flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all group">
          <Bell size={20} className="text-slate-300 group-hover:text-white transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        
        {/* Divider */}
        <div className="h-8 w-px bg-slate-700"></div>
        {/* User Info Card */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-700/40 to-slate-700/20 border border-slate-600/30 hover:border-slate-500/50 transition-all">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">{user?.name?.charAt(0) || "G"}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white text-sm">{user?.name || "Guest"}</span>
            <span className="text-xs text-blue-400 capitalize font-medium">{role || "Guest"}</span>
          </div>
        </div>
        <Link 
          to="/profile" 
          className="p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 hover:scale-105 transition-all group"
          title="Profile"
        >
          <UserCircle size={20} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
        </Link>
        <Link 
          to="/settings" 
          className="p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 hover:scale-105 transition-all group"
          title="Settings"
        >
          <Settings size={20} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
        </Link>
        <button 
          onClick={logout} 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile Menu Button - Opens Sidebar */}
      <div className="flex md:hidden items-center gap-2">
        <button className="p-2.5 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all">
          <Bell size={20} className="text-slate-300" />
        </button>
        <button 
          className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border border-blue-500/30 transition-all"
          onClick={() => setMobileMenuOpen?.(!mobileMenuOpen)}
          title="Open Menu"
        >
          <Menu size={24} className="text-blue-400" />
        </button>
      </div>
    </header>
  );
}
