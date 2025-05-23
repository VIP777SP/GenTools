import { FaBars } from "react-icons/fa6";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center border-b border-gray-200 shadow-md bg-bar text-bar-text">
      <FaBars 
        className="text-3xl p-1 bg-neutral-800 cursor-pointer hover:bg-neutral-700 transition-colors" 
        onClick={onMenuClick} 
      />
      <h1 className="font-logo text-2xl ml-3">
        GenTools
      </h1>
    </header>
  );
}