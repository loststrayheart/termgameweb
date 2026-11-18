import React from 'react';
import { ShieldCheck, Zap, Headphones, Heart, Zap as Lightning } from 'lucide-react';

export default function Footer({ onSelectGame }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-14 pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Trust Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">ระบบออโต้ 24 ชั่วโมง</h4>
              <p className="text-xs text-slate-500">จัดส่ง UC & VP ไวใน 1-3 นาที</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">ปลอดภัย 100%</h4>
              <p className="text-xs text-slate-500">ใช้เพียง UID / Riot ID ไม่ใช้รหัสผ่าน</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#06C755]/10 text-[#06C755] flex items-center justify-center shrink-0 border border-[#06C755]/20 shadow-md">
              <div className="w-6 h-6 font-black text-center leading-6">L</div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">ล็อกอินผ่าน LINE</h4>
              <p className="text-xs text-slate-500">สะสม termgame Coins สมาชิก</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20 shadow-md">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">แอดมินดูแล 24 ชม.</h4>
              <p className="text-xs text-slate-500">LINE Official: @528gfrkg</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg">
                <Lightning className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-white">
                term<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">game</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              ผู้ให้บริการเติมเงินเกมออนไลน์ชั้นนำ PUBG Mobile และ VALORANT ในประเทศไทย 
              เติมเงินง่าย สะดวกรวดเร็ว ผ่านระบบอัตโนมัติ 24 ชั่วโมง พร้อมระบบสมาชิก LINE Login 
              สะสมคะแนนแลกส่วนลดและของรางวัล
            </p>
            <div className="text-xs text-slate-500 pt-1">
              เวลาทำการ: เปิดบริการตลอด 24 ชั่วโมง ไม่มีวันหยุด
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3">เกมที่ให้บริการ</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectGame('pubg')}
                  className="hover:text-indigo-400 transition"
                >
                  เติม PUBG Mobile (ID ไทย)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectGame('valorant')}
                  className="hover:text-indigo-400 transition"
                >
                  เติม VALORANT (Riot ID)
                </button>
              </li>
              <li>
                <span className="text-slate-600">PUBG Royale Pass Elite</span>
              </li>
              <li>
                <span className="text-slate-600">VALORANT Battlepass</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3">ช่องทางติดต่อ & ช่วยเหลือ</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a 
                  href="https://line.me/R/ti/p/@528gfrkg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition"
                >
                  <span>LINE Official: @528gfrkg</span>
                </a>
              </li>
              <li>Facebook: termgame Thailand</li>
              <li>แจ้งปัญหาการเติมเงิน (24 ชม.)</li>
              <li>นโยบายความเป็นส่วนตัว</li>
              <li>เงื่อนไขการให้บริการ</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © 2026 termgame (Thailand) Co., Ltd. สงวนลิขสิทธิ์ทุกประการ
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span className="text-emerald-400 font-semibold">Thai QR PromptPay</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">TrueMoney Wallet</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
