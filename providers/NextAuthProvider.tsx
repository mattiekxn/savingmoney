'use client';
import { SessionProvider } from "next-auth/react";
export const NextAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>{children}</SessionProvider>
);