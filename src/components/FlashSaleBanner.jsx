import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { FLASH_SALE_ITEMS } from '../data/mockData';

export default function FlashSaleBanner({ onSelectPackage }) {
  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 20,
    minutes: 38,
    seconds: 44
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n) => String(n).padStart(2, '0');

  return (
    <section id="flash-sale-section" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center space-x-3">
          {/* Flash Sale Badge with Gamer Glow */}
          <div className="flex items-center bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white font-black text-sm tracking-wide rounded-xl p-0.5 shadow-lg shadow-rose-600/20">
            <div className="bg-slate-950 px-3 py-1.5 rounded-[10px] flex items-center space-x-2">
              <span className="text-rose-500 flex items-center italic font-black text-xs sm:text-sm">
                F<span className="text-amber-400">⚡</span>ASH
              </span>
              <span className="font-bold text-xs text-white tracking-wider">SALE</span>
            </div>
          </div>

          {/* Countdown Boxes */}
          <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-white">
            <div className="bg-slate-900 border border-slate-800 text-indigo-400 px-2.5 py-1.5 rounded-lg text-center shadow-inner">
              {timeLeft.days} วัน
            </div>
            <div className="bg-slate-900 border border-slate-800 text-slate-100 px-2 py-1.5 rounded-lg text-center min-w-[30px] shadow-inner">
              {format2(timeLeft.hours)}
            </div>
            <span className="text-indigo-400 font-black">:</span>
            <div className="bg-slate-900 border border-slate-800 text-slate-100 px-2 py-1.5 rounded-lg text-center min-w-[30px] shadow-inner">
              {format2(timeLeft.minutes)}
            </div>
            <span className="text-indigo-400 font-black">:</span>
            <div className="bg-slate-900 border border-slate-800 text-rose-400 px-2 py-1.5 rounded-lg text-center min-w-[30px] shadow-inner">
              {format2(timeLeft.seconds)}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <button 
          onClick={() => {
            const el = document.getElementById('games-grid-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-xs"
        >
          <span>ดูทั้งหมด</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Flash Sale Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {FLASH_SALE_ITEMS.map((item) => {
          const percentSold = Math.round((item.sold / item.total) * 100);

          return (
            <div
              key={item.id}
              onClick={() => onSelectPackage(item.gameId, item.name)}
              className="group cursor-pointer bg-slate-900/90 hover:bg-slate-850 rounded-2xl p-3 border border-slate-800 hover:border-indigo-500/80 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm hover:-translate-y-1"
            >
              {/* Top discount badge */}
              <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-md">
                {item.discount}
              </div>

              {/* Thumbnail with Game ID Badge */}
              <div className="flex flex-col items-center mt-2">
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-800 shadow-md group-hover:scale-105 transition">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/80 backdrop-blur-xs text-indigo-300 text-[8px] font-bold px-1.5 py-0.5 rounded border border-white/10">
                    {item.badge}
                  </div>
                </div>

                {/* Item Details */}
                <h4 className="font-bold text-xs text-white text-center mt-2.5 line-clamp-1 group-hover:text-indigo-400 transition">
                  {item.name}
                </h4>
                <p className="text-[10px] text-slate-400 text-center mb-1 line-clamp-1">
                  {item.subtitle}
                </p>

                {/* Price in Bold Red / Rose */}
                <div className="text-center my-1">
                  <div className="text-rose-400 font-black text-base sm:text-lg tracking-tight">
                    ฿{item.price.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 line-through">
                    ฿{item.originalPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress Bar & Sold Badge */}
              <div className="mt-2 pt-2 border-t border-slate-800/80">
                <div className="bg-slate-950/80 rounded-full py-0.5 px-2 flex items-center justify-center space-x-1 border border-slate-800">
                  <Flame className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-slate-300">
                    ขายแล้ว {item.sold}/{item.total}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 h-full rounded-full"
                    style={{ width: `${percentSold}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
