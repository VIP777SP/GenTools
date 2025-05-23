"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
// TierMakerClientを動的インポート（SSR無効）
const TierMakerClient = dynamic(() => import('./components/TierMakerClient'), {
  ssr: false,
  loading: () => (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tier表作成</h1>
        <p className="text-gray-600">読み込み中...</p>
      </div>
      <div className="animate-pulse">
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
});

export default function TierMakerPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tier表作成</h1>
          <p className="text-gray-600">読み込み中...</p>
        </div>
        <div className="animate-pulse">
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TierMakerClient />
      <Footer />
    </div>
  );
}
