"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar({
  brandName,
  logoUrl,
}: {
  brandName: string;
  logoUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/#about", label: "About" },
    { href: "/portfolio", label: "Work" },
    { href: "/#experience", label: "Experience" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" aria-label={brandName} className="flex min-w-0 items-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${brandName} logo`}
              className="h-9 w-auto max-w-[190px] object-contain"
            />
          ) : (
            <span className="text-sm font-semibold uppercase tracking-[.18em]">
              Patricio <span className="text-[#d7bd7d]">Manayan </span>Jr.
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/admin"
          className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[.16em] text-white/65 transition hover:border-white/25 hover:text-white md:flex"
        >
          Admin <ArrowUpRight size={13} />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          className="rounded-full border border-white/10 p-2 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-black/80 md:hidden"
          >
            <nav className="container-shell flex flex-col py-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  onClick={() => setOpen(false)}
                  href={link.href}
                  className="border-b border-white/5 py-4 text-sm text-white/75"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
