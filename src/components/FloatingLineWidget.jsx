import React, { useState } from 'react';
import { MessageCircle, Gift, X } from 'lucide-react';

export default function FloatingLineWidget({ onOpenLogin, user }) {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-2 select-none pointer-events-auto">
      
      {/* Floating Promotional Badge matching Screenshot 2 */}
      {showTooltip && (
        <div className="bg-slate-900 text-white rounded-2xl p-2.5 shadow-2xl border-2 border-yellow-400 flex items-center space-x-2 text-xs max-w-xs animate-bounce">
          <span className="text-base">🎁</span>
          <div className="leading-tight">
            <span className="font-bold text-yellow-300 block">เติมเกมเสร็จอย่าลืมกดรับสิทธิ์!</span>
            <span className="text-[10px] text-slate-300">หมุนวงล้อลุ้น UC & VP ฟรีทุกวัน</span>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating LINE Button matching Screenshot 2 */}
      <a
        href="https://line.me/R/ti/p/@528gfrkg" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group bg-[#06C755] hover:bg-[#05b34c] active:scale-95 text-white py-2.5 px-4 rounded-full shadow-xl flex items-center space-x-2.5 transition border-2 border-white/40 cursor-pointer"
        onClick={(e) => {
          if (!user) {
            e.preventDefault();
            onOpenLogin();
          }
        }}
      >
        {/* LINE Icon */}
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#06C755] font-black shadow-inner">
          <svg className="w-4 h-4 fill-[#06C755]" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.01 1.76 5.66 4.45 7.15-.2.72-.71 2.61-.81 3.02-.13.52.19.51.4.37.17-.11 2.37-1.61 3.32-2.26.85.12 1.74.19 2.64.19 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
          </svg>
        </div>
        
        <div className="text-left">
          <div className="text-xs font-black tracking-wide leading-none">
            ติดตาม Pro LINE
          </div>
          <div className="text-[10px] text-green-100 font-medium leading-tight">
            แอดมินดูแล 24 ชม.
          </div>
        </div>
      </a>
    </div>
  );
}
