"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { primaryNav } from "@/lib/site-config";
import { PhaseBadge } from "@/components/ui/PhaseBadge";

// Hamburger-triggered slide-in drawer for small screens -- replicating the
// desktop mega-menu in a narrow viewport is the anti-pattern "mobile-first"
// is meant to avoid, so this is a single flat accordion-free list instead.
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="app-pill inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-900/[0.08] text-slate-600 hover:border-slate-900/15 hover:bg-slate-900/[0.04] hover:text-slate-900 md:hidden dark:border-white/10 dark:text-white/60 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <Menu size={16} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute inset-y-0 right-0 w-72 max-w-[85vw] overflow-y-auto bg-white p-5 shadow-xl dark:bg-[#0b0d14]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-900/[0.05] dark:text-white/80 dark:hover:bg-white/10"
                >
                  {item.label}
                  <PhaseBadge phase={item.phase} />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
