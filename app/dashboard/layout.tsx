'use client';

import { useSession, signOut } from 'next-auth/react';
import { Target, History, LayoutDashboard, LogOut, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-100 p-6 flex flex-col gap-8 hidden md:flex">
        <div className="flex items-center gap-2 px-2">
          <div className="bg-emerald-500 p-1.5 rounded-lg text-white"><Target size={20} /></div>
          <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">GrowUp</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-2xl font-bold transition-all">
            <LayoutDashboard size={20} /> แดชบอร์ด
          </Link>
          <Link href="/dashboard/history" className="flex items-center gap-3 text-slate-400 hover:bg-slate-50 px-4 py-3 rounded-2xl font-bold transition-all">
            <History size={20} /> ประวัติการออม
          </Link>
        </nav>

        <button onClick={() => signOut()} className="flex items-center gap-3 text-slate-400 hover:text-rose-500 px-4 py-3 font-bold transition-all">
          <LogOut size={20} /> ออกจากระบบ
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col">
        {/* HEADER (มุมซ้าย-ขวา ตามที่คุณต้องการ) */}
        <header className="flex justify-between items-center px-8 py-6 bg-white/50 backdrop-blur-sm sticky top-0 z-30">
          <h1 className="text-xl font-black text-slate-900">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none">User Profile</p>
              <p className="text-sm font-bold text-slate-700">{session?.user?.name}</p>
            </div>
            <img src={session?.user?.image || ""} className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" alt="profile" />
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}