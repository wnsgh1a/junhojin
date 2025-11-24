"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "WORK", path: "/portfolio" },
  { name: "ABOUT", path: "/about" },
  { name: "NEWS", path: "/news" },
  { name: "CONTACT", path: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="text-xl font-semibold tracking-[0.25em]">
          JOOCHOIST
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-10">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  text-sm tracking-wide transition
                  ${
                    active
                      ? "text-white bg-yellow-400 px-2 py-0.5 rounded-full font-semibold"
                      : "text-white/80 hover:text-white"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
