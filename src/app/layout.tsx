"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Reggae_One } from "next/font/google";
import React, { useState } from 'react';
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const logoFont = Reggae_One({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <html lang="ja">
      <head>
        <title>Genshin Tools</title>
        <meta name="description" content="原神の便利ツール、リンク集" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${logoFont.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header onMenuClick={handleToggleSidebar} />
        
        {/* オーバーレイ */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 transition-opacity duration-300"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            onClick={handleCloseSidebar}
          />
        )}
        
        {/* サイドバー */}
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        
        <main className="flex-grow mb-footer pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
