import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FlashSaleBanner from './components/FlashSaleBanner';
import HeroSection from './components/HeroSection';
import GameSelector from './components/GameSelector';
import TopUpPage from './components/TopUpPage';
import PaymentModal from './components/PaymentModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import Footer from './components/Footer';
import { Star } from 'lucide-react';

export default function App() {
  // Navigation: 'home' | 'pubg' | 'valorant'
  const [activeView, setActiveView] = useState('home');
  const [selectedGameId, setSelectedGameId] = useState('pubg');
  const [preselectedPackage, setPreselectedPackage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals (ตัด loginModalOpen ออกแล้ว)
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleSelectGame = (gameId) => {
    setSelectedGameId(gameId);
    setActiveView(gameId);
    setPreselectedPackage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFlashPackage = (gameId, packageName) => {
    setSelectedGameId(gameId);
    setActiveView(gameId);
    setPreselectedPackage(packageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToPayment = (orderData) => {
    setCurrentOrder(orderData);
    setPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-indigo-600 selection:text-white">

      {/* Top Navbar (ส่งเฉพาะ prop ที่จำเป็น ไม่ต้องมี login/logout) */}
      <Navbar
        onSelectGame={handleSelectGame}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenHistory={() => setHistoryModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* Flash Sale Banner */}
            <FlashSaleBanner onSelectPackage={handleSelectFlashPackage} />

            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectGame={handleSelectGame}
            />

            {/* Game Selection Grid (PUBG & VALORANT Only) */}
            <GameSelector
              onSelectGame={handleSelectGame}
              searchQuery={searchQuery}
            />

            {/* Customer Reviews / Social Proof */}
            <section className="py-14 bg-slate-900/40 border-y border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <div className="flex items-center justify-center space-x-1 text-amber-400 mb-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    เกมเมอร์ไทยไว้วางใจ termgame
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    คะแนนความพึงพอใจ 4.9/5 ดาว จัดส่งรวดเร็ว ปลอดภัย 100%
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl">
                    <div className="flex items-center space-x-1 text-amber-400 text-xs mb-3">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      "เติม 8,100 UC ใน PUBG Mobile จ่ายผ่าน PromptPay สแกนเสร็จไม่ถึงนาที UC เข้าไอดีเลย สะดวกและปลอดภัยมากครับ"
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-slate-200">คุณอาร์ม (Arm_Gamer)</span>
                      <span className="text-indigo-400">เติมผ่าน PromptPay</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl">
                    <div className="flex items-center space-x-1 text-amber-400 text-xs mb-3">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      "ซื้อแต้ม Valorant 11,000 VP ไปสุ่มบันเดิลใหม่ ลดราคาเยอะมาก เติมง่ายไม่ต้องสมัครสมาชิกให้ยุ่งยาก คุ้มสุดๆ"
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-slate-200">น้องแบงค์ (TenZ_TH)</span>
                      <span className="text-indigo-400">เติมผ่าน TrueMoney</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl">
                    <div className="flex items-center space-x-1 text-amber-400 text-xs mb-3">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      "บริการดีมาก เติมตอนดึกระบบออโต้ก็ยังทำงานไวมาก ไม่ต้องรอแอดมินส่งโค้ด เข้าไอดีตรงทันที แนะนำเลยครับ"
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-slate-200">คุณกอล์ฟ (Golf_PUBG)</span>
                      <span className="text-emerald-400">เติมผ่าน LINE Pay</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {(activeView === 'pubg' || activeView === 'valorant') && (
          <TopUpPage
            gameId={selectedGameId}
            onBack={() => setActiveView('home')}
            onProceedToPayment={handleProceedToPayment}
            preselectedPackage={preselectedPackage}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectGame={handleSelectGame} />

      {/* Payment / Checkout Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        orderData={currentOrder}
      />

      {/* Order History Modal */}
      <OrderHistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
      />

    </div>
  );
}