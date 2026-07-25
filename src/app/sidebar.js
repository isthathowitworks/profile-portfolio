"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home, Folder, User, Mail, Sun, Moon,
  PanelLeftClose, PanelLeftOpen, Menu, X,
} from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const [dark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Close the mobile drawer automatically whenever the route changes
  // (e.g. after tapping a nav link), so it doesn't stay open on the next page.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const DarkModeToggle = ({ compact }) => (
    <button
      onClick={() => setDark(!dark)}
      className={`relative h-[32px] rounded-full border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 transition ${
        compact ? "w-[32px] mx-auto" : "w-[60px]"
      }`}
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ${
          dark
            ? "bg-orange-600 text-white left-[calc(100%-28px)]"
            : "bg-transparent text-stone-900 dark:text-stone-100 left-1"
        }`}
      >
        {dark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );

  const NavLinks = ({ collapsed: navCollapsed, onNavigate }) => (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            title={navCollapsed ? label : undefined}
            onClick={onNavigate}
            className={`relative flex items-center gap-2 text-base font-medium py-2.5 rounded-md transition-all duration-200 ${
              navCollapsed ? "justify-center px-2" : ""
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
            {!navCollapsed && label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar — hidden below md, collapsible on md+ */}
      <aside
        className={`hidden md:flex shrink-0 border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-4 flex-col justify-between transition-all duration-200 ${
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

          <NavLinks collapsed={collapsed} />
        </div>

        <DarkModeToggle compact={collapsed} />
      </aside>

      {/* Mobile top bar — name/logo + hamburger, both top-left, fixed */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-16 border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-md text-stone-900 dark:text-stone-100 hover:text-orange-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <p className="text-lg font-semibold text-stone-900 dark:text-stone-50">Welcome</p>
        {/* Spacer to balance the hamburger so the title stays visually centered */}
        <span className="w-[34px]" aria-hidden="true" />
      </div>

      {/* Mobile slide-out drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-[240px] bg-white dark:bg-stone-800 p-4 flex flex-col justify-between shadow-xl transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between px-2 pr-0 mb-12">
              <p className="text-2xl font-semibold text-stone-900 dark:text-stone-50">
                Welcome
              </p>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-md text-stone-900 dark:text-stone-100 hover:text-orange-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <NavLinks collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </div>

          <DarkModeToggle compact={false} />
        </div>
      </div>
    </>
  );
}