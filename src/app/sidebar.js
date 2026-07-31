"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home, Folder, User, Mail,
  PanelLeftClose, PanelLeftOpen, Menu, X,
} from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const NavLinks = ({ collapsed: navCollapsed, onNavigate, instanceId }) => (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            title={navCollapsed ? label : undefined}
            onClick={onNavigate}
            // Padding is FIXED (pl-4 pr-2) for every state — it never
            // changes between active/inactive, so there is no jump.
            className={`relative flex items-center gap-2 text-base font-medium py-2.5 pl-2 pr-2 rounded-md ${
              navCollapsed ? "justify-center px-2" : ""
            } ${
              isActive
                ? "text-orange-600 dark:text-orange-400"
                : "text-stone-900 dark:text-stone-100 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-stone-50 dark:hover:bg-stone-700"
            }`}
          >
            {/* Sliding highlight background — glides between links */}
            {isActive && (
              <motion.span
                layoutId={`nav-pill-${instanceId}`}
                className="absolute inset-0 rounded-md bg-stone-100 dark:bg-stone-700"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}

            {/* Sliding left indicator bar */}
            {isActive && (
              <motion.span
                layoutId={`nav-indicator-${instanceId}`}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-full bg-orange-600 dark:bg-orange-400"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}

            {/* THIS is the part you asked about: icon + label shift right
                on selection, animated via transform (not padding), so it
                slides smoothly instead of snapping.
                translate-x-4 (16px) over 500ms — deliberately larger/slower
                than before so the slide is unmistakable. */}
            <span
              className={`relative flex items-center gap-2 transition-transform duration-500 ease-out ${
                isActive && !navCollapsed ? "translate-x-2" : "translate-x-0"
              }`}
            >
              <Icon size={18} />
              {!navCollapsed && label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
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

          <NavLinks collapsed={collapsed} instanceId="desktop" />
        </div>
      </aside>

      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-16 border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-md text-stone-900 dark:text-stone-100 hover:text-orange-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <p className="text-lg font-semibold text-stone-900 dark:text-stone-50">Welcome</p>
        <span className="w-[34px]" aria-hidden="true" />
      </div>

      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
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

            <NavLinks
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
              instanceId="mobile"
            />
          </div>
        </div>
      </div>
    </>
  );
}