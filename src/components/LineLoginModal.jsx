import React, { useState } from 'react';
import { X, CheckCircle, Smartphone, QrCode, Shield, Sparkles } from 'lucide-react';

export default function LineLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('quick');
  const [customName, setCustomName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickLogin = (userName = 'Krit_Gamer') => {
    setLoading(true);
    setTimeout(() => {
      const user = {
        name: userName,
        lineId: '@user_' + Math.floor(100000 + Math.random() * 900000),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        coins: 250,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem('richman_user', JSON.stringify(user));
      setLoading(false);
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;
    handleQuickLogin(customName.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-800 transform transition-all text-slate-100">
        {/* LINE Header */}
        <div className="bg-[#06C755] text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#06C755] font-black text-xl shadow-md">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.01 1.76 5.66 4.45 7.15-.2.72-.71 2.61-.81 3.02-.13.52.19.51.4.37.17-.11 2.37-1.61 3.32-2.26.85.12 1.74.19 2.64.19 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">เข้าสู่ระบบด้วย LINE</h3>
              <p className="text-xs text-green-100 font-light">LINE Login Service for termgame</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-black/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Benefit Badge */}
          <div className="mb-5 bg-indigo-950/60 border border-indigo-500/30 rounded-2xl p-3 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-200">
              <span className="font-bold text-white">สิทธิพิเศษสำหรับสมาชิก termgame LINE:</span> รับทันที <span className="font-bold text-indigo-400">250 termgame Coins</span> และสะสมประวัติการเติมเงินอัตโนมัติ
            </div>
          </div>

          {/* Login Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-2xl mb-5 text-xs font-medium text-slate-400 border border-slate-800">
            <button
              onClick={() => setActiveTab('quick')}
              className={`py-2 rounded-xl transition text-center ${activeTab === 'quick' ? 'bg-indigo-600 text-white shadow-sm font-bold' : 'hover:text-white'}`}
            >
              ด่วน 1-Click
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`py-2 rounded-xl transition text-center ${activeTab === 'qr' ? 'bg-indigo-600 text-white shadow-sm font-bold' : 'hover:text-white'}`}
            >
              สแกน QR Code
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`py-2 rounded-xl transition text-center ${activeTab === 'custom' ? 'bg-indigo-600 text-white shadow-sm font-bold' : 'hover:text-white'}`}
            >
              ระบุชื่อบัญชี
            </button>
          </div>

          {/* Quick Login */}
          {activeTab === 'quick' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 text-center">
                เข้าสู่ระบบทันทีด้วยบัญชี LINE ทดลอง เพื่อใช้งานระบบเติมเงิน termgame ได้ทันที
              </p>

              <button
                disabled={loading}
                onClick={() => handleQuickLogin('Gamer_Thailand')}
                className="w-full bg-[#06C755] hover:bg-[#05b34c] active:scale-[0.98] text-white py-3.5 px-4 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-lg shadow-green-600/20 transition disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.01 1.76 5.66 4.45 7.15-.2.72-.71 2.61-.81 3.02-.13.52.19.51.4.37.17-.11 2.37-1.61 3.32-2.26.85.12 1.74.19 2.64.19 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                </svg>
                <span>{loading ? 'กำลังเชื่อมต่อ LINE...' : 'เข้าสู่ระบบด้วย LINE ทันที'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('น้องเนย_PUBG')}
                  className="p-2.5 border border-slate-800 bg-slate-950/60 hover:border-emerald-500 rounded-xl text-xs font-medium text-slate-300 flex items-center space-x-2 transition"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">น</span>
                  <span className="truncate">น้องเนย_PUBG</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('TenZ_ValorantTH')}
                  className="p-2.5 border border-slate-800 bg-slate-950/60 hover:border-indigo-500 rounded-xl text-xs font-medium text-slate-300 flex items-center space-x-2 transition"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">T</span>
                  <span className="truncate">TenZ_ValorantTH</span>
                </button>
              </div>
            </div>
          )}

          {/* QR Code Tab */}
          {activeTab === 'qr' && (
            <div className="flex flex-col items-center text-center space-y-3 py-1">
              <div className="bg-slate-950 p-4 rounded-2xl border-2 border-dashed border-[#06C755] relative group">
                <div className="w-44 h-44 bg-white p-2 rounded-xl shadow-inner flex flex-col items-center justify-center">
                  <QrCode className="w-32 h-32 text-slate-900" />
                  <div className="text-[10px] text-slate-400 font-mono mt-1">SCAN WITH LINE APP</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 backdrop-blur-xs rounded-2xl transition">
                  <button
                    onClick={() => handleQuickLogin('LINE_ScanUser')}
                    className="bg-[#06C755] text-white text-xs font-bold py-2 px-3 rounded-lg shadow"
                  >
                    คลิกเพื่อจำลองสแกนสำเร็จ
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                เปิดแอป <span className="font-bold text-[#06C755]">LINE</span> บนมือถือ &gt; สแกน QR Code ด้านบน
              </p>
            </div>
          )}

          {/* Custom Name Tab */}
          {activeTab === 'custom' && (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  ระบุชื่อบัญชี LINE ที่ต้องการแสดง
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น พี่แชมป์, JettPro, ValorantTH"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#06C755] text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 rounded-2xl font-bold text-sm shadow transition"
              >
                เข้าสู่ระบบด้วยชื่อนี้
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center space-x-2 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-slate-500" />
            <span>เข้าสู่ระบบอย่างปลอดภัยผ่าน LINE Login Official</span>
          </div>
        </div>
      </div>
    </div>
  );
}
