'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] p-12 text-center border border-white"
      >
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Lock size={40} strokeWidth={2.5} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">ยินดีต้อนรับ</h1>
        <p className="text-slate-400 font-medium mb-10 text-sm italic">ปลดล็อกเป้าหมายการออมของคุณ</p>

        <div className="space-y-4">
          {/* Google Login */}
          <button 
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-xl"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="google" />
            Sign in with Google
          </button>

          {/* Email Login (ตัวเลือกเสริมในอนาคต) */}
          <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-slate-400 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            <Mail size={20} />
            Sign in with Email
          </button>
        </div>
      </motion.div>
    </div>
  );
}