import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Download, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function PaymentModal({ orderData, isOpen, onClose, onSuccess }) {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // 15-minute countdown timer
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    if (!isOpen) {
      setIsCompleted(false);
      setCompletedOrder(null);
      setSecondsLeft(15 * 60);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !orderData) return null;

  const { game, playerId, verifiedName, paymentMethod, packageItem, user } = orderData;
  const orderRef = 'TG' + Math.floor(10000000 + Math.random() * 90000000);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const finishedOrder = {
        id: orderRef,
        date: new Date().toLocaleString('th-TH'),
        gameName: game.fullName,
        gameId: game.id,
        playerId,
        verifiedName,
        package: packageItem.name,
        price: packageItem.price,
        payment: paymentMethod.name,
        status: 'จัดส่งสำเร็จ',
        coinsEarned: Math.round(packageItem.price * 0.05),
      };

      const existing = JSON.parse(localStorage.getItem('richman_orders') || '[]');
      localStorage.setItem('richman_orders', JSON.stringify([finishedOrder, ...existing]));

      if (user) {
        const storedUser = JSON.parse(localStorage.getItem('richman_user') || '{}');
        storedUser.coins = (storedUser.coins || 0) + finishedOrder.coinsEarned;
        localStorage.setItem('richman_user', JSON.stringify(storedUser));
      }

      setIsProcessing(false);
      setIsCompleted(true);
      setCompletedOrder(finishedOrder);
      if (onSuccess) onSuccess(finishedOrder);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-800 transform transition-all text-slate-100">
        
        {/* Modal Header */}
        <div className="bg-slate-950 p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-sm shadow-md">
              TG
            </div>
            <div>
              <h3 className="font-black text-base text-white leading-tight">
                {isCompleted ? 'ชำระเงินสำเร็จแล้ว' : 'ช่องทางชำระเงิน (Online Payment)'}
              </h3>
              <p className="text-[11px] text-slate-400">เลขอ้างอิง: {orderRef}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {!isCompleted ? (
            <div className="space-y-5">
              
              {/* Order Info Pill */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium">รายการที่สั่งซื้อ</div>
                  <div className="text-sm font-bold text-white">
                    {packageItem.name} ({game.name})
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {game.type}: <span className="font-mono font-bold text-indigo-400">{playerId}</span> ({verifiedName})
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">ยอดชำระ</div>
                  <div className="text-xl font-black text-rose-400">
                    ฿{packageItem.price.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Countdown Alert */}
              <div className="flex items-center justify-between text-xs bg-slate-950/60 border border-slate-800 px-4 py-3 rounded-2xl text-slate-300">
                <div className="flex items-center space-x-2 font-medium">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>กรุณาชำระเงินภายในเวลาที่กำหนด</span>
                </div>
                <span className="font-mono font-black text-rose-400 text-sm">
                  {formatTimer(secondsLeft)}
                </span>
              </div>

              {/* QR Code Presentation */}
              <div className="bg-slate-950 rounded-2xl p-5 border-2 border-dashed border-slate-800 flex flex-col items-center text-center">
                
                <div className="bg-[#003B70] text-white px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider mb-3">
                  THAI QR PAYMENT
                </div>

                <div className="bg-white p-3 rounded-2xl shadow-xl relative group">
                  <div className="w-48 h-48 bg-slate-950 rounded-xl p-2 flex flex-col items-center justify-center text-white">
                    <QrCode className="w-40 h-40 text-white" />
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-400">
                  <div className="font-bold text-white">termgame (Thailand) Co., Ltd.</div>
                  <div className="text-[11px] text-slate-500">รองรับแอปธนาคารทุกแห่งผ่านพร้อมเพย์ และ TrueMoney Wallet</div>
                </div>

                <div className="mt-3 flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(packageItem.price.toString())}
                    className="text-[11px] font-semibold text-slate-300 bg-slate-850 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'คัดลอกยอดเงินแล้ว' : `คัดลอกยอดเงิน ฿${packageItem.price}`}</span>
                  </button>
                </div>
              </div>

              {/* Simulation Testing Button */}
              <div className="space-y-2 pt-2">
                <button
                  disabled={isProcessing}
                  onClick={handleSimulateSuccess}
                  className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:to-pink-600 active:scale-98 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/25 transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{isProcessing ? 'ระบบกำลังตรวจสอบยอดเงิน...' : 'จำลองการชำระเงินสำเร็จ (คลิกเพื่อทดสอบ)'}</span>
                </button>
                <p className="text-[10px] text-slate-500 text-center">
                  * ในระบบจริง ระบบจะตรวจสอบสลิปอัตโนมัติภายใน 5-15 วินาที
                </p>
              </div>

            </div>
          ) : (
            /* COMPLETED STATE */
            <div className="text-center space-y-5 py-2">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  ทำรายการสำเร็จเรียบร้อย
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  ระบบจัดส่ง {game.id === 'pubg' ? 'UC' : 'VP'} เข้าไอดีแล้ว!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  แต้มเข้าบัญชีของคุณเรียบร้อยแล้ว สามารถเข้าเกมตรวจสอบได้ทันที
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-800 font-medium">
                  <span className="text-slate-400">หมายเลขออเดอร์</span>
                  <span className="font-mono font-bold text-white">{completedOrder?.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 font-medium">
                  <span className="text-slate-400">เกมที่เติม</span>
                  <span className="font-bold text-white">{completedOrder?.gameName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 font-medium">
                  <span className="text-slate-400">{game.type} ผู้เล่น</span>
                  <span className="font-mono font-bold text-indigo-400">{completedOrder?.playerId} ({completedOrder?.verifiedName})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 font-medium">
                  <span className="text-slate-400">แพ็กเกจ</span>
                  <span className="font-bold text-white">{completedOrder?.package}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 font-medium">
                  <span className="text-slate-400">วิธีชำระ</span>
                  <span className="font-bold text-white">{completedOrder?.payment}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 font-medium">
                  <span className="text-slate-400">ยอดเงินที่ชำระ</span>
                  <span className="font-black text-rose-400 text-sm">฿{completedOrder?.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-indigo-400 bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/20">
                  <span>termgame Coins ที่ได้รับ</span>
                  <span>+{completedOrder?.coinsEarned} Coins</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-2xl text-xs transition"
                >
                  เสร็จสิ้นและกลับหน้าหลัก
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
