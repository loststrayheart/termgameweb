import React from 'react';
import { X, History, CheckCircle2, Package, Calendar, Gamepad2 } from 'lucide-react';

export default function OrderHistoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const orders = JSON.parse(localStorage.getItem('richman_orders') || '[]');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-800 text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-950 p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight text-white">ประวัติคำสั่งซื้อของฉัน</h3>
              <p className="text-[11px] text-slate-400">รายการเติมเงิน termgame ย้อนหลังทั้งหมด</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-slate-600 stroke-1" />
              <p className="text-sm font-medium text-slate-300">ยังไม่มีประวัติคำสั่งซื้อ</p>
              <p className="text-xs text-slate-500 mt-1">
                เมื่อคุณเติม PUBG หรือ VALORANT รายการจะแสดงที่นี่โดยอัตโนมัติ
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/50 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-500">
                      #{ord.id}
                    </span>
                    <span className="text-[11px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{ord.status}</span>
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{ord.gameName}</h4>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {ord.package}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        ID: <span className="font-mono text-indigo-400">{ord.playerId}</span> ({ord.verifiedName})
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-rose-400">
                        ฿{ord.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-indigo-400 font-bold mt-0.5">
                        +{ord.coinsEarned} Coins
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{ord.date}</span>
                    <span>{ord.payment}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-850 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition border border-slate-700"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
