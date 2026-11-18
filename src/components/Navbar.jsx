import React, { useState } from 'react';
import { 
  Gamepad2, 
  Flame, 
  Coins, 
  LogOut, 
  History, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronDown, 
  Zap
} from 'lucide-react';

export default function Navbar({ 
  user, 
  onOpenLogin, 
  onLogout, 
  onSelectGame, 
  activeView, 
  setActiveView,
  onOpenHistory 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800 shadow-xl">
      {/* Top Notification Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800/60 text-slate-300 text-xs py-1.5 px-4 font-normal">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              ⚡ termgame
            </span>
            <span className="truncate text-slate-300 text-xs">
              ศูนย์บริการเติมเกม PUBG Mobile & VALORANT ราคาถูก ระบบออโต้เข้าไว 24 ชั่วโมง
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"></span>
              <span className="text-emerald-400 font-medium">ระบบเปิดบริการปกติ (24/7)</span>
            </span>
            <span>|</span>
            <span className="text-slate-300">LINE: <a href="https://line.me/R/ti/p/@528gfrkg" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2">@528gfrkg</a></span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand: termgame */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setActiveView('home')}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/25 border border-indigo-400/30 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  term<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">game</span>
                </span>
                <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  TH
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                เติมเกมอัตโนมัติ PUBG & VALORANT
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5 text-sm font-semibold text-slate-300">
            <button
              onClick={() => setActiveView('home')}
              className={`px-4 py-2 rounded-xl transition ${
                activeView === 'home' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold' 
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              หน้าแรก
            </button>

            <button
              onClick={() => {
                setActiveView('home');
                const el = document.getElementById('flash-sale-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 flex items-center space-x-1.5 transition font-bold"
            >
              <Flame className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>FLASH SALE</span>
            </button>

            <button
              onClick={() => onSelectGame('pubg')}
              className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition ${
                activeView === 'pubg' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold' 
                  : 'hover:bg-slate-800/80 hover:text-amber-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>PUBG Mobile</span>
            </button>

            <button
              onClick={() => onSelectGame('valorant')}
              className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition ${
                activeView === 'valorant' 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold' 
                  : 'hover:bg-slate-800/80 hover:text-rose-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>VALORANT</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="px-4 py-2 rounded-xl hover:bg-slate-800/80 flex items-center space-x-1.5 transition text-slate-400 hover:text-slate-200"
            >
              <History className="w-4 h-4" />
              <span>เช็คคำสั่งซื้อ</span>
            </button>
          </nav>

          {/* Right Action: LINE Login / User Profile */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition text-left"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#06C755]"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#06C755] rounded-full border border-slate-900 flex items-center justify-center">
                      <span className="text-[7px] text-white font-bold">L</span>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-white truncate max-w-[110px]">
                      {user.name}
                    </div>
                    <div className="flex items-center space-x-1 text-[11px] text-indigo-400 font-semibold">
                      <Coins className="w-3 h-3" />
                      <span>{user.coins} Coins</span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-950/60">
                      <p className="text-xs text-slate-400">บัญชี LINE ที่เชื่อมต่อ</p>
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <div className="mt-1 flex items-center space-x-1 text-xs text-indigo-400 font-bold">
                        <Coins className="w-3.5 h-3.5" />
                        <span>ยอดสะสม: {user.coins} Coins</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenHistory();
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-medium text-slate-300 hover:bg-slate-800 flex items-center space-x-2.5"
                    >
                      <History className="w-4 h-4 text-slate-400" />
                      <span>ประวัติคำสั่งซื้อทั้งหมด</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2.5"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>ออกจากระบบ LINE</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="bg-[#06C755] hover:bg-[#05b34c] active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 fill-[#06C755]" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.01 1.76 5.66 4.45 7.15-.2.72-.71 2.61-.81 3.02-.13.52.19.51.4.37.17-.11 2.37-1.61 3.32-2.26.85.12 1.74.19 2.64.19 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                  </svg>
                </div>
                <span>ล็อกอินด้วย LINE</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800 space-y-1">
            <button
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              หน้าแรก
            </button>
            <button
              onClick={() => {
                onSelectGame('pubg');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-amber-400 hover:bg-slate-800 flex items-center space-x-2"
            >
              <span>🎮</span>
              <span>PUBG Mobile (ID ไทย)</span>
            </button>
            <button
              onClick={() => {
                onSelectGame('valorant');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-rose-400 hover:bg-slate-800 flex items-center space-x-2"
            >
              <span>🎯</span>
              <span>VALORANT (Riot ID)</span>
            </button>
            <button
              onClick={() => {
                onOpenHistory();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 flex items-center space-x-2"
            >
              <History className="w-4 h-4 text-slate-400" />
              <span>ประวัติคำสั่งซื้อของฉัน</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
