import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  CreditCard,
  QrCode,
  Wallet,
  Smartphone,
  ExternalLink,
  Coins,
  Zap
} from 'lucide-react';
import { GAMES, PAYMENT_METHODS } from '../data/mockData';

export default function TopUpPage({ 
  gameId, 
  user, 
  onBack, 
  onOpenLogin, 
  onProceedToPayment,
  preselectedPackage 
}) {
  const game = GAMES.find(g => g.id === gameId) || GAMES[0];
  const isPubg = game.id === 'pubg';

  // States
  const [playerId, setPlayerId] = useState('');
  const [saveId, setSaveId] = useState(true);
  const [verifiedName, setVerifiedName] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  
  const [selectedPayment, setSelectedPayment] = useState('promptpay_free');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (preselectedPackage) {
      const pkg = game.packages.find(p => p.name === preselectedPackage);
      if (pkg) {
        setSelectedPackage(pkg);
      } else {
        setSelectedPackage(game.packages[2] || game.packages[0]);
      }
    } else {
      setSelectedPackage(game.packages[2] || game.packages[0]);
    }

    const saved = localStorage.getItem(`saved_id_${game.id}`);
    if (saved) {
      setPlayerId(saved);
      setVerifiedName(game.sampleNames[0]);
    }
  }, [game, preselectedPackage]);

  const handleVerifyId = () => {
    if (!playerId.trim()) {
      setVerifyError(`กรุณากรอก ${game.inputLabel}`);
      setVerifiedName(null);
      return;
    }

    setIsVerifying(true);
    setVerifyError('');

    setTimeout(() => {
      setIsVerifying(false);
      if (game.id === 'pubg') {
        if (!/^\d+$/.test(playerId.trim())) {
          setVerifyError('UID ของ PUBG ต้องเป็นตัวเลขล้วน (เช่น 5123456789)');
          setVerifiedName(null);
          return;
        }
      } else if (game.id === 'valorant') {
        if (!playerId.includes('#')) {
          setVerifyError('Riot ID ต้องมีชื่อและแท็ก คั่นด้วยเครื่องหมาย # เช่น TenZ#NA1');
          setVerifiedName(null);
          return;
        }
      }

      const randomName = game.sampleNames[Math.floor(Math.random() * game.sampleNames.length)];
      setVerifiedName(randomName);
      setVerifyError('');

      if (saveId) {
        localStorage.setItem(`saved_id_${game.id}`, playerId.trim());
      }
    }, 500);
  };

  const currentPayment = PAYMENT_METHODS.find(p => p.id === selectedPayment) || PAYMENT_METHODS[0];

  const handleCheckout = () => {
    if (!playerId.trim()) {
      alert(`กรุณากรอก ${game.inputLabel} ก่อนทำรายการ`);
      return;
    }
    if (!selectedPackage) {
      alert('กรุณาเลือกแพ็กเกจที่ต้องการเติม');
      return;
    }

    onProceedToPayment({
      game,
      playerId: playerId.trim(),
      verifiedName: verifiedName || (game.id === 'pubg' ? 'ChickenMaster' : 'AgentTH#1'),
      paymentMethod: currentPayment,
      packageItem: selectedPackage,
      user
    });
  };

  return (
    <div className="bg-[#0B0F19] min-h-screen pb-28 text-slate-100">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className={`w-11 h-11 rounded-2xl bg-slate-950 p-1.5 border-2 shadow-lg shrink-0 ${
              isPubg ? 'border-amber-400' : 'border-rose-400'
            }`}>
              <img src={game.icon} alt={game.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center space-x-2">
                <span>{game.fullName}</span>
                <span className="text-xs font-normal text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                  termgame ออโต้ 24 ชม.
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                ใช้แค่ {game.type} ไม่ต้องใช้รหัสผ่าน • รับคะแนนสะสมทุกคำสั่งซื้อ
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>กลับไปเลือกเกม</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        
        {/* Mobile Back Button */}
        <button
          onClick={onBack}
          className="sm:hidden mb-4 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับไปเลือกเกม</span>
        </button>

        {/* LINE Login Notice Banner */}
        {!user ? (
          <div className="mb-6 bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center space-x-3 text-xs sm:text-sm">
              <Info className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>
                กรุณา <strong className="font-bold underline cursor-pointer text-emerald-400" onClick={onOpenLogin}>ล็อกอินด้วย LINE</strong> เพื่อรับเหรียญสะสมและบันทึกประวัติคำสั่งซื้ออัตโนมัติ
              </span>
            </div>
            <button
              onClick={onOpenLogin}
              className="bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
            >
              <span>ล็อกอินด้วย LINE</span>
            </button>
          </div>
        ) : (
          <div className="mb-6 bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#06C755]" />
              <span>
                เข้าสู่ระบบด้วย LINE: <strong className="text-white">{user.name}</strong> • ยอดสะสม: <strong className="text-indigo-400">{user.coins} Coins</strong>
              </span>
            </div>
            <span className="text-[11px] bg-[#06C755] text-white px-2.5 py-0.5 rounded-lg font-bold">
              LINE Verified
            </span>
          </div>
        )}

        {/* Information & Guide Card */}
        <div className="bg-slate-900/80 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl mb-6">
          <h2 className="text-base sm:text-lg font-black text-white mb-2">
            เติม {game.name} กับ termgame ราคาถูก ปลอดภัย 100%
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            เติมเงิน {game.name} ออนไลน์ง่ายๆ กับ termgame ใช้เพียง {game.type} ไม่ต้องใช้รหัสผ่าน ปลอดภัย ไม่เสี่ยงโดนแบน ระบบอัตโนมัติ 24 ชม. 
            รองรับช่องทางชำระเงินทั้ง QR PromptPay และ TrueMoney Wallet อัตโนมัติ 24 ชม.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <h3 className="font-bold text-xs sm:text-sm text-slate-200 mb-2.5">
              วิธีเติม {game.name} ผ่าน {game.type} ที่ termgame
            </h3>

            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-400">
              {game.howToSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>

            {readMore && (
              <div className="mt-4 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-indigo-400">
                  🛡️ ข้อควรระวังและนโยบายความปลอดภัยของ termgame
                </div>
                <p>
                  1. ตรวจสอบ {game.type} ของคุณให้ถูกต้องทุกครั้งก่อนชำระเงิน หากกรอกผิดและระบบจัดส่งแล้วจะไม่สามารถดึงคืนได้
                </p>
                <p>
                  2. ทางร้านไม่มีนโยบายสอบถามรหัสผ่าน (Password) หรือ OTP ของผู้เล่นโดยเด็ดขาด
                </p>
                <p>
                  3. หากติดปัญหาหรือแต้มไม่เข้าภายใน 10 นาที สามารถทักแอดมินทาง LINE: @528gfrkg ได้ตลอด 24 ชั่วโมง
                </p>
              </div>
            )}

            <button
              onClick={() => setReadMore(!readMore)}
              className="mt-3 text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              <span>{readMore ? 'ย่อเนื้อหา' : 'อ่านเพิ่มเติม'}</span>
              {readMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* STEP 1: Enter UID / Riot ID */}
        <div className="bg-slate-900/80 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl mb-6">
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs flex items-center justify-center shadow-md">
              1
            </div>
            <h3 className="text-base font-black text-white">
              กรอกข้อมูลไอดี ({game.inputLabel})
            </h3>
          </div>

          <div className="max-w-xl space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={playerId}
                onChange={(e) => {
                  setPlayerId(e.target.value);
                  setVerifiedName(null);
                  setVerifyError('');
                }}
                placeholder={game.inputPlaceholder}
                className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium placeholder-slate-500"
              />
              <button
                type="button"
                onClick={handleVerifyId}
                disabled={isVerifying}
                className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
              >
                {isVerifying ? 'กำลังตรวจสอบ...' : 'ตรวจสอบชื่อในเกม'}
              </button>
            </div>

            {/* Verification result feedback */}
            {verifiedName && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-3.5 flex items-center space-x-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  ตรวจสอบพบชื่อในเกม: <strong className="font-bold text-emerald-300 text-sm">{verifiedName}</strong> (พร้อมรับแต้ม)
                </span>
              </div>
            )}

            {verifyError && (
              <div className="bg-rose-950/60 border border-rose-500/40 rounded-2xl p-3.5 flex items-center space-x-2 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{verifyError}</span>
              </div>
            )}

            <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={saveId}
                onChange={(e) => setSaveId(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-500"
              />
              <span>บันทึก {game.type} หลัก เพื่อใช้ครั้งต่อไปโดยไม่ต้องกรอกใหม่</span>
            </label>
          </div>
        </div>

        {/* STEP 2: Select Payment Method */}
        <div className="bg-slate-900/80 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl mb-6">
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs flex items-center justify-center shadow-md">
              2
            </div>
            <h3 className="text-base font-black text-white">
              กรุณาเลือกวิธีการชำระเงิน
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAYMENT_METHODS.map((pm) => {
              const isSelected = selectedPayment === pm.id;

              return (
                <div
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/30 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/60'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 text-indigo-400">
                      <CheckCircle2 className="w-5 h-5 fill-indigo-500 text-white" />
                    </div>
                  )}

                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
                      {pm.id.includes('line') ? (
                        <div className="w-7 h-7 rounded-lg bg-[#06C755] text-white flex items-center justify-center text-xs font-black">
                          LINE
                        </div>
                      ) : pm.id.includes('shopee') ? (
                        <div className="w-7 h-7 rounded-lg bg-[#EE4D2D] text-white flex items-center justify-center text-xs font-black">
                          S
                        </div>
                      ) : pm.id.includes('truemoney') ? (
                        <div className="w-7 h-7 rounded-lg bg-[#F37023] text-white flex items-center justify-center text-[10px] font-bold">
                          TMN
                        </div>
                      ) : pm.id.includes('credit') ? (
                        <CreditCard className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <QrCode className="w-5 h-5 text-indigo-400" />
                      )}
                    </div>

                    <div className="pr-6">
                      <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">
                        {pm.name}
                      </h4>
                      {pm.subname && (
                        <span className="text-[11px] text-slate-400 block">{pm.subname}</span>
                      )}
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        {pm.badgeText}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className={`px-2 py-0.5 rounded-lg font-bold border ${pm.tagColor}`}>
                      {pm.feeText}
                    </span>
                    {pm.recommended && (
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold px-2 py-0.5 rounded-md">
                        แนะนำ
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 3: Select Package */}
        <div className="bg-slate-900/80 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl mb-6">
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs flex items-center justify-center shadow-md">
              3
            </div>
            <h3 className="text-base font-black text-white">
              เลือกแพ็กเกจที่ต้องการ ({game.packages.length} แพ็กเกจ)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5">
            {game.packages.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 shadow-xl ring-2 ring-indigo-500/40'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{pkg.icon}</span>
                    <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 font-black text-[10px] px-2 py-0.5 rounded-md">
                      {pkg.discount}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-indigo-400">
                      {pkg.name}
                    </h4>
                    {pkg.bonus && (
                      <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                        {pkg.bonus}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
                    <div>
                      <div className="text-rose-400 font-black text-base sm:text-lg">
                        ฿{pkg.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500 line-through">
                        ฿{pkg.originalPrice.toLocaleString()}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-md">
                        เลือกแล้ว
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 4: Order Summary Floating Dock */}
        <div className="sticky bottom-4 z-30 bg-slate-950/95 text-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-indigo-500/40 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-black text-xl shrink-0">
                {selectedPackage ? selectedPackage.icon : '🎮'}
              </div>
              <div className="truncate">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">สรุปคำสั่งซื้อ</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400">
                    ID: {playerId ? playerId : '(ยังไม่ได้ระบุ)'}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white truncate">
                  {selectedPackage ? `${selectedPackage.name} (${game.name})` : 'กรุณาเลือกแพ็กเกจ'}
                </div>
                <div className="text-[11px] text-slate-400">
                  ช่องทาง: {currentPayment.name}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">ยอดชำระสุทธิ</span>
                <span className="text-xl sm:text-2xl font-black text-rose-400">
                  ฿{selectedPackage ? selectedPackage.price.toLocaleString() : 0}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:to-pink-600 active:scale-95 text-white font-black text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 transition cursor-pointer"
              >
                ยืนยันและชำระเงิน
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
