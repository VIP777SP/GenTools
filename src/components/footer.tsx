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
        <footer className="h-footer bg-bar px-6 border-t border-neutral-300 shadow-lg fixed bottom-0 left-0 right-0">
            <ul className="flex items-center justify-between">
                {MenuList.map((menu) => (
                    <Link key={menu.name} href={menu.href} className="text-bar-text text-center mt-2 flex flex-col hover:opacity-70 transition-opacity">
                      <li className="text-4xl">{menu.icon}</li>
                      <p className="text-xs">{menu.name}</p>
                    </Link>
                ))}
            </ul>
        </footer>
    )
}

