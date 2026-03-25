'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Target, TrendingUp, Wallet, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentSavings] = useState(7555.55);
  const goal = 20000;
  const percentage = (currentSavings / goal) * 100;

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <main className="max-w-xl mx-auto p-6 pt-12 space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-center px-2">
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Dashboard</p>
            <h1 className="text-2xl font-black text-slate-900">ออมเงินกับ GrowUp</h1>
          </div>
          <img src={session?.user?.image || ""} className="w-12 h-12 rounded-2xl border-4 border-white shadow-sm" />
        </div>

        {/* Main Saving Card - ปรับปรุงจากรูปที่คุณส่งมา */}
        <section className="bg-white rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-3xl font-black text-slate-900">กลับมาเริ่มจาก <span className="text-emerald-500 text-4xl">0</span></h2>
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl shadow-inner">
                <Target size={24} />
              </div>
            </div>

            {/* Modern Progress Bar */}
            <div className="relative w-full h-16 bg-slate-100 rounded-[1.5rem] p-2 mb-8 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl relative shadow-[0_8px_20px_rgba(16,185,129,0.25)]"
              >
                <div className="absolute top-0 right-0 w-8 h-full bg-white/20 blur-[1px] rounded-r-xl" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center font-black text-slate-800 tracking-tight">
                ฿ {currentSavings.toLocaleString()} <span className="text-slate-400 font-medium text-sm ml-2">({percentage.toFixed(1)}%)</span>
              </div>
            </div>

            <button className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-600 hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3">
              <Plus size={24} strokeWidth={3} /> บันทึกเงินออม
            </button>
          </div>
        </section>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
            <p className="text-[10px] font-black opacity-50 uppercase mb-1">ยอดออมสะสม</p>
            <p className="text-2xl font-black">฿{currentSavings.toLocaleString()}</p>
            <TrendingUp size={60} className="absolute -bottom-4 -right-4 opacity-10" />
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center items-center">
            <CheckCircle2 className="text-emerald-500 mb-2" size={28} />
            <p className="text-xs font-bold text-slate-400">ออมต่อเนื่อง 5 วัน</p>
          </div>
        </div>
      </main>
    </div>
  );
}