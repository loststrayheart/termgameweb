import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Zap
} from 'lucide-react';
import { loginUser, registerUser } from '../lib/supabase';

export default function LineLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!username.trim()) {
      setError('กรุณากรอกชื่อผู้ใช้');
      return;
    }
    if (!password) {
      setError('กรุณากรอกรหัสผ่าน');
      return;
    }

    if (mode === 'register') {
      if (password.length < 4) {
        setError('รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร');
        return;
      }
      if (password !== confirmPassword) {
        setError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
        return;
      }

      setLoading(true);
      const res = await registerUser({ username, password });
      setLoading(false);

      if (res.success) {
        setSuccessMsg('สมัครสมาชิกและบันทึกลง Database สำเร็จ!');
        setTimeout(() => {
          onLoginSuccess(res.user);
          onClose();
        }, 600);
      } else {
        setError(res.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    } else {
      // Login mode
      setLoading(true);
      const res = await loginUser({ username, password });
      setLoading(false);

      if (res.success) {
        setSuccessMsg('เข้าสู่ระบบสำเร็จ!');
        setTimeout(() => {
          onLoginSuccess(res.user);
          onClose();
        }, 500);
      } else {
        setError(res.error || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    }
  };

  const handleQuickDemo = async (demoUser, demoPass) => {
    setUsername(demoUser);
    setPassword(demoPass);
    setError('');
    setLoading(true);
    const res = await registerUser({ username: demoUser, password: demoPass });
    setLoading(false);
    if (res.success) {
      onLoginSuccess(res.user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-800 transform transition-all text-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-base text-white leading-tight">
                {mode === 'login' ? 'เข้าสู่ระบบสมาชิก termgame' : 'สมัครสมาชิกใหม่ termgame'}
              </h3>
              <p className="text-xs text-indigo-300 font-light">บันทึกข้อมูลบน Cloud Database (Supabase)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* Benefit Badge */}
          <div className="mb-5 bg-indigo-950/50 border border-indigo-500/30 rounded-2xl p-3 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-200">
              <span className="font-bold text-white">สิทธิประโยชน์สมาชิก:</span> ได้รับทันที <strong className="text-indigo-400">250 termgame Coins</strong> และระบบจะบันทึกประวัติคำสั่งซื้อลงฐานข้อมูลโดยอัตโนมัติ
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1.5 rounded-2xl mb-5 text-xs font-bold border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2.5 rounded-xl transition text-center cursor-pointer ${
                mode === 'login' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2.5 rounded-xl transition text-center cursor-pointer ${
                mode === 'register' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              สมัครสมาชิกใหม่
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                ชื่อผู้ใช้ (Username)
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="เช่น gamer01, champ_th, pro_player"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium placeholder-slate-600"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                รหัสผ่าน (Password)
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่านของคุณ"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register mode only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ยืนยันรหัสผ่าน (Confirm Password)
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium placeholder-slate-600"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-rose-950/60 border border-rose-500/40 rounded-xl p-3 flex items-center space-x-2 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3 flex items-center space-x-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:to-pink-600 active:scale-98 text-white py-3.5 px-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/25 transition disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>กำลังดำเนินการ...</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิกและรับ 250 Coins'}</span>
              )}
            </button>
          </form>

          {/* Quick Demo Test Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <p className="text-[11px] text-slate-500 text-center mb-2">
              หรือกดทดสอบบัญชีด่วน (คลิกเดียวเข้าสู่ระบบทันที):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('Player_TH', '1234')}
                className="p-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <span>🎮 Player_TH</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('ProGamer_TH', '1234')}
                className="p-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <span>⚡ ProGamer_TH</span>
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center space-x-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>เชื่อมต่อฐานข้อมูล Supabase PostgreSQL ปลอดภัย 100%</span>
          </div>

        </div>
      </div>
    </div>
  );
}
