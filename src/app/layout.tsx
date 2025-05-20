import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Reggae_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
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

export const metadata: Metadata = {
  title: "Genshin Tools",
  description: "原神の便利ツール、リンク集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${logoFont.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow mb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
