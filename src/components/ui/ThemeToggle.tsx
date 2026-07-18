"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// Sun/moon icon swap wired to next-themes. Renders both icons and lets CSS
// (`dark:` variants, driven by the .dark/.light class next-themes sets on
// <html>) pick the visible one -- avoids a mounted-state guard (and the
// setState-in-effect it requires) entirely, since nothing here branches on
// theme during render.
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className={
        className ??
        "app-pill inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-900/[0.08] text-slate-600 hover:border-slate-900/15 hover:bg-slate-900/[0.04] hover:text-slate-900 dark:border-white/10 dark:text-white/60 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
      }
    >
      <Moon size={15} className="dark:hidden" />
      <Sun size={15} className="hidden dark:block" />
    </button>
  );
}
