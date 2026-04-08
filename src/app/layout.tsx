import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from '@/auth';
import { signOut } from '@/auth';
import Image from 'next/image';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sund Reading Tracker",
  description: "Track your Pornhwa, webnovels and anime",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
<html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-blue-500/20">
          <span className="text-blue-200 font-semibold">Reading Tracker</span>
          {session?.user && (
            <div className="flex items-center gap-3">
              {session.user.image && (
                <Image src={session.user.image} alt="avatar" width={32} height={32} className="rounded-full" />
              )}
              <span className="text-slate-400 text-sm">{session.user.name}</span>
              <form action={async () => { 'use server'; await signOut(); }}>
                <button type="submit" className="text-slate-400 hover:text-white text-sm cursor-pointer transition-colors">
                  Sign out
                </button>
              </form>
            </div>
          )}
        </header>
        {children}
      </body>
    </html>
  );
}
