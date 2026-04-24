"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appText, navLinks } from "@/data/fitnessData";

export default function Navbar() {
  const pathname = usePathname();

  function resolveHref(href: string) {
    if (!href.startsWith("#")) {
      return href;
    }
    return pathname === "/" ? href : `/${href}`;
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-emerald-500/20 bg-zinc-950/80 backdrop-blur"
    >
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="التنقل الرئيسي"
      >
        <Link href="/" className="text-sm font-black tracking-wide text-emerald-400">
          {appText.brand}
        </Link>

        <ul className="flex items-center gap-2 overflow-x-auto text-nowrap md:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={resolveHref(link.href)}
                className="block rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition hover:bg-emerald-500/10 hover:text-emerald-300 md:text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
