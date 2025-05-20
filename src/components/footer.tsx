import { FaHome, FaArticle, FaTool, FaLink } from "react-icons/fa";

export default function Footer() {
  const MenuList = [
    {
            name: "ホーム",
            href: "/",
            icon:<FaHome />
        },
        {
            name: "記事",
            href: "/gs-articles",
            icon:<FaHome />
        },
        {
            name: "ツール集",
            href: "/gs-tools",
            icon:<FaHome />
        },
        {
            name: "リンク集",
            href: "/gs-links",
            icon:<FaLink />
        },
    ]
    return (
        <footer className="h-footer bg-white px-4 border-t border-neutral-700 shadow-lg fixed bottom-0 left-0 right-0">
            <ul className="flex items-center justify-between">
                {MenuList.map((menu) => (
                    <div key={menu.name} className="text-center mt-2">
                      <li className="text-4xl">{menu.icon}</li>
                      <p className="text-xs">{menu.name}</p>
                    </div>
                ))}
            </ul>
        </footer>
    )
}

