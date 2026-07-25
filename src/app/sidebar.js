"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home, Folder, User, Mail,
  PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const [navOpen, setNavOpen] = useState(true);
  const [hovered, setHovered] = useState(null);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setNavOpen((v) => !v)}
        aria-label={navOpen ? "Hide navigation" : "Show navigation"}
        className={`fixed top-4 left-0 z-50 inline-flex h-10 items-center overflow-hidden rounded-r-full border border-l-0 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 cursor-pointer pl-1 shadow-sm transition-all duration-300 ease-out ${
          navOpen ? "max-w-40 pr-6" : "max-w-13"
        }`}
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
          {navOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </span>
        <span
          aria-hidden="true"
          className={`whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${
            navOpen ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          Menu
        </span>
      </button>

      <nav
        aria-label="Main"
        className={`fixed top-17 left-0 z-40 flex flex-col items-start gap-2.5 transition-all duration-300 ease-out ${
          navOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          const isExpanded = isActive || hovered === href;

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(href)}
              onBlur={() => setHovered(null)}
              className={`inline-flex h-10 items-center overflow-hidden rounded-r-full border border-l-0 pl-1 shadow-sm transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600 ${
                isExpanded ? "max-w-40 pr-6" : "max-w-13"
              } ${
              isActive
                  ? "border-orange-600/30 dark:border-orange-400/30 bg-orange-50 dark:bg-orange-400/10"
                  : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800"
              }`}
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                <Icon
                  size={18}
                  aria-hidden="true"
                  className={isActive ? "text-orange-600 dark:text-orange-400" : "text-stone-900 dark:text-stone-100"}
                />
              </span>
              <span
                aria-hidden="true"
                className={`whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${
                  isExpanded ? "opacity-100 delay-100" : "opacity-0"
                } ${isActive ? "text-orange-600 dark:text-orange-400" : "text-stone-900 dark:text-stone-100"}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}