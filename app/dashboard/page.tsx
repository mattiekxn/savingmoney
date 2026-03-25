'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, TrendingUp, Calendar, CheckCircle2, X, Wallet, PencilLine } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ข้อมูลจำลอง (เดี๋ยวเราจะเปลี่ยนเป็นดึงจาก DB จริงในขั้นตอนถัดไป)
  const [currentSavings, setCurrentSavings] = useState(0);
  const goal = 10000; // ตาม Schema ที่ตั้งไว้
  const percentage = (currentSavings / goal) * 100;

  // ฟังก์ชันส่งข้อมูลไปบันทึก
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/savings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, note }),
      });

      if (res.ok) {
        // ถ้าบันทึกสำเร็จ ให้เพิ่มยอดในหน้าจอทันที (Optimistic Update)
        setCurrentSavings(prev => prev + parseFloat(amount));
        setIsModalOpen(false);
        setAmount('');
        setNote('');
        alert('หยอดกระปุกสำเร็จ! 🎉');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      
      {/* Main Saving Card */}
      <section className="bg-white rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-white">
        <div className="flex justify-between items-start mb-8">
           <h2 className="text-4xl font-black text-slate-900 tracking-tight">
             ยอดออมปัจจุบัน
           </h2>
           <div className="bg-emerald-50 text-emerald-500 p-3 rounded-2xl">
             <Calendar size={24} />
           </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-20 bg-slate-50 rounded-[1.8rem] p-2 mb-10 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-[1.2rem] relative shadow-lg shadow-emerald-200"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2">
             <span className="text-2xl font-black text-slate-800 tracking-tighter italic">฿ {currentSavings.toLocaleString()}</span>
             <span className="text-slate-400 font-bold text-sm">({percentage.toFixed(1)}%)</span>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-emerald-500 text-white py-6 rounded-[2rem] font-black text-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-4"
        >
          <Plus size={32} strokeWidth={4} /> บันทึกเงินออม
        </button>
      </section>

      {/* --- กล่องป๊อปอัพ (MODAL) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop พื้นหลังดำเบลอ */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[50]"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[3rem] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.2)] z-[51] border border-white"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900">หยอดกระปุก 💰</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-500"><X /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">จำนวนเงิน (บาท)</label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold text-xl outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">บันทึกสั้นๆ</label>
                  <div className="relative">
                    <PencilLine className="absolute left-4 top-4 text-slate-300" size={20} />
                    <textarea 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="เช่น ค่าขนมที่เหลือ..."
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold outline-none transition-all h-24"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all active:scale-95 disabled:opacity-50 shadow-xl"
                >
                  {isLoading ? 'กำลังบันทึก...' : 'ยืนยันการออม'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Grid สถิติด้านล่าง (เหมือนเดิม) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
           <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em] mb-2">เป้าหมาย</p>
           <p className="text-3xl font-black">฿{goal.toLocaleString()}</p>
           <TrendingUp className="absolute -bottom-4 -right-4 opacity-10" size={100} />
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
           <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
           <p className="font-black text-slate-800">วินัยการออม</p>
           <p className="text-slate-400 text-sm font-medium">ทำได้ดีมาก!</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">ระยะเวลา</p>
           <p className="text-2xl font-black text-slate-800">1 ปี</p>
        </div>
      </div>
    </div>
  );
}