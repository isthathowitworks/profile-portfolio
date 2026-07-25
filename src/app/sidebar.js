"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home, Folder, User, Mail,
  PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Folder },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <aside
      className={`shrink-0 border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-4 flex flex-col transition-all duration-200 ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
    >
      <div>
        <div
          className={`flex items-center mb-12 ${
            collapsed ? "justify-center" : "justify-between px-2 pr-0"
          }`}
        >
          {!collapsed && (
            <p className="text-2xl font-semibold text-stone-900 dark:text-stone-50">
              Welcome
            </p>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-stone-900 dark:text-stone-100 hover:text-orange-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`relative flex items-center gap-2 text-base font-medium py-2.5 rounded-md transition-all duration-200 ${
                  collapsed ? "justify-center px-2" : ""
                } ${
                  isActive
                    ? "text-orange-600 bg-stone-100 dark:bg-stone-700 pl-4 pr-2"
                    : "text-stone-900 dark:text-stone-100 hover:text-orange-600 hover:bg-stone-50 dark:hover:bg-stone-700 pl-2 pr-2"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-full bg-orange-600 transition-all duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Icon size={18} />
                {!collapsed && label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}