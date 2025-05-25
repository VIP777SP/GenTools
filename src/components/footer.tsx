import { FaHouse, FaNewspaper, FaScrewdriverWrench, FaLink } from "react-icons/fa6";
import Link from "next/link";

const MenuList = [
    {
            name: "ホーム",
            href: "/",
            icon:<FaHouse />
        },
        {
            name: "記事",
            href: "/gs-articles",
            icon:<FaNewspaper />
        },
        {
            name: "ツール集",
            href: "/gs-tools",
            icon:<FaScrewdriverWrench />
        },
        {
            name: "リンク集",
            href: "/gs-links",
            icon:<FaLink />
        },
    ]

export default function Footer() {
    return (
        <footer className="h-[2.5rem] bg-bar px-4 border-t border-neutral-300 shadow-lg fixed bottom-0 left-0 right-0 z-40">
            <ul className="flex items-center justify-between h-full">
                {MenuList.map((menu) => (
                    <Link key={menu.name} href={menu.href} className="text-bar-text text-center flex flex-col justify-center hover:opacity-70 transition-opacity py-1">
                      <li className="text-lg">{menu.icon}</li>
                      <p className="text-[10px] leading-none">{menu.name}</p>
                    </Link>
                ))}
            </ul>
        </footer>
    )
}

