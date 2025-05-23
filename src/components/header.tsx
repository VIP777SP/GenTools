import { FaBars } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="flex items-center border-b border-gray-200 shadow-md bg-bar text-bar-text">
      <FaBars className="text-3xl p-1 bg-neutral-800" />
      <h1 className="font-logo text-2xl ml-3">
        GenTools
      </h1>
    </header>
  );
}