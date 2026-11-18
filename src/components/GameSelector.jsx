import React from 'react';
import { GAMES } from '../data/mockData';
import { Shield, Zap, Sparkles, ArrowRight, Star } from 'lucide-react';

export default function GameSelector({ onSelectGame, searchQuery }) {
  const filteredGames = GAMES.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="games-grid-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <span>🎮</span>
            <span>เลือกเกมที่ต้องการเติมเงิน (PUBG & VALORANT)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            เติมได้ทันทีผ่านระบบอัตโนมัติของ <strong className="text-indigo-400">termgame</strong> ได้รับ UC และ VP ไวใน 1-3 นาที
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/60">
          <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          <span>ระบบออโต้พร้อมส่ง 24 ชม.</span>
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="bg-slate-900/80 rounded-3xl p-10 text-center border border-slate-800">
          <p className="text-slate-400 font-medium text-sm">ไม่พบเกมที่ตรงกับคำค้นหา "{searchQuery}"</p>
          <p className="text-xs text-slate-500 mt-1">termgame เปิดให้บริการเฉพาะ PUBG Mobile และ VALORANT</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredGames.map((game) => {
            const isPubg = game.id === 'pubg';

            return (
              <div
                key={game.id}
                onClick={() => onSelectGame(game.id)}
                className={`group cursor-pointer bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/80 shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-sm hover:-translate-y-1.5 ${
                  isPubg ? 'hover:shadow-amber-500/10' : 'hover:shadow-rose-500/10'
                }`}
              >
                {/* Card Banner Header */}
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                  {/* Badges on Banner */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className={`text-white font-black text-xs px-3 py-1 rounded-xl shadow-lg ${
                      isPubg ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-rose-500 to-red-600'
                    }`}>
                      {game.badge}
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 font-semibold text-xs px-2.5 py-1 rounded-xl border border-white/10">
                      {game.type}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-emerald-500/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1.5 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>พร้อมส่งทันที</span>
                  </div>

                  {/* Bottom title inside banner */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center space-x-3.5">
                      <div className={`w-14 h-14 rounded-2xl bg-slate-950 p-1.5 shadow-2xl border-2 shrink-0 ${
                        isPubg ? 'border-amber-400' : 'border-rose-400'
                      }`}>
                        <img src={game.icon} alt={game.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-indigo-300 transition">
                          {game.fullName}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          {game.category} • เติมผ่าน {game.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-5">
                      {game.description}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                      <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 flex items-center space-x-2.5">
                        <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div className="text-[11px]">
                          <span className="text-slate-500 block">ความปลอดภัย</span>
                          <span className="font-bold text-slate-200">ไม่ต้องใช้รหัสผ่าน</span>
                        </div>
                      </div>
                      <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 flex items-center space-x-2.5">
                        <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div className="text-[11px]">
                          <span className="text-slate-500 block">ความเร็ว</span>
                          <span className="font-bold text-slate-200">ระบบเข้าเกม 1-3 นาที</span>
                        </div>
                      </div>
                    </div>

                    {/* Packages Snapshot */}
                    <div className="text-xs text-slate-400 mb-4 flex items-center space-x-2">
                      <span className="font-semibold text-slate-300">แพ็กเกจยอดนิยม:</span>
                      <span className="text-slate-400 truncate">
                        {game.packages.slice(0, 3).map(p => p.name).join(', ')} ...
                      </span>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">ราคาเริ่มต้น</span>
                      <span className="text-lg font-black text-rose-400">
                        ฿{game.packages[0].price}
                      </span>
                    </div>
                    <button className={`text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg transition-all group-hover:translate-x-1 ${
                      isPubg 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/20' 
                        : 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-rose-500/20'
                    }`}>
                      <span>เติมเงิน {game.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
