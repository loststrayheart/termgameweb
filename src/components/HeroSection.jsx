import React from 'react';
import { Search, ShieldCheck, Users, Headphones, Check, Sparkles } from 'lucide-react';

export default function HeroSection({ searchQuery, setSearchQuery, onSelectGame }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0e1424] via-[#0F172A] to-[#0B0F19] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
      
      {/* Background Glow Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
        
        {/* Breadcrumb */}
        <div className="text-xs text-indigo-400 font-medium mb-4 flex items-center justify-center md:justify-start space-x-2">
          <span className="hover:text-indigo-300 cursor-pointer">หน้าแรก</span>
          <span className="text-slate-600">&gt;</span>
          <span className="text-slate-300 font-bold">เติมเกมผ่าน UID & Riot ID</span>
          <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/30">
            termgame Official
          </span>
        </div>

        {/* Big Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          เติมเกมราคาถูก <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">termgame</span>
        </h1>

        {/* Subhead */}
        <p className="text-sm sm:text-base text-slate-300 font-normal mb-8 max-w-2xl leading-relaxed">
          ศูนย์บริการเติมเกม PUBG Mobile & VALORANT ปลอดภัย 100% ใช้แค่ UID และ Riot ID ไม่ต้องใช้รหัสผ่าน ระบบออโต้จัดส่งไว 24 ชั่วโมง
        </p>

        {/* Search Bar with Modern Glass Style */}
        <div className="max-w-2xl relative mb-6 mx-auto md:mx-0">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-indigo-400 absolute left-4.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเกม เช่น PUBG, VALORANT, UC, Riot ID..."
              className="w-full pl-12 pr-4 py-4 bg-slate-900/90 text-white rounded-2xl text-sm sm:text-base font-medium placeholder-slate-500 shadow-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg px-2.5 py-1.5 font-bold transition"
              >
                ล้างคำค้น
              </button>
            )}
          </div>
        </div>

        {/* Signature Checkmarks */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-3 gap-x-6 text-xs sm:text-sm font-semibold text-slate-300 pt-1">
          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3.5 py-1.5 rounded-full">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black">✓</span>
            <span>ไม่ต้องใช้รหัสผ่าน (UID / Riot ID)</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3.5 py-1.5 rounded-full">
            <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-black">✓</span>
            <span>ระบบออโต้ & แอดมิน 24 ชม.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
