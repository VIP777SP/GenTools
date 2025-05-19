import { FaBars } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="flex items-center border-b border-gray-200 shadow-md">
      <FaBars className="text-2xl m-2 text-indigo-700 " />
      <h1 className="text-2xl text-indigo-800 font-bold justify-center flex-1 scale-x-80 border-b border-rose-400 tracking-tighter">
        GenTools
      </h1>
    </header>
  );
}