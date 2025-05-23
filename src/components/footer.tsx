import { FaHouse, FaNewspaper, FaScrewdriverWrench, FaLink } from "react-icons/fa6";

export default function Footer() {
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
    return (
        <footer className="h-footer bg-bar px-6 border-t border-neutral-300 shadow-lg fixed bottom-0 left-0 right-0">
            <ul className="flex items-center justify-between">
                {MenuList.map((menu) => (
                    <div key={menu.name} className="text-bar-text text-center mt-2 flex flex-col">
                      <li className="text-4xl">{menu.icon}</li>
                      <p className="text-xs">{menu.name}</p>
                    </div>
                ))}
            </ul>
        </footer>
    )
}

