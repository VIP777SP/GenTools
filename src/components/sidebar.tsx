import React from 'react';
import { FaXmark } from 'react-icons/fa6';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[100] ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* サイドバーヘッダー */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-bar text-bar-text">
        <h2 className="text-lg font-logo font-semibold">メニュー</h2>
        <button
          onClick={onClose}
          className="text-bar-text hover:text-gray-300 transition-colors"
        >
          <FaXmark className="text-xl" />
        </button>
      </div>

      {/* サイドバーコンテンツ */}
      <div className="p-4">
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="/" className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors">
                ホーム
              </a>
            </li>
            <li>
              <a href="/gs-articles" className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors">
                記事
              </a>
            </li>
            <li>
              <a href="/gs-tools" className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors">
                ツール集
              </a>
            </li>
            <li>
              <a href="/gs-links" className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors">
                リンク集
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
