import Link from "next/link";
import { primaryNav, siteName } from "@/lib/site-config";
import { SearchBar } from "@/components/layout/SearchBar";
import { LogoutButton } from "@/components/layout/LogoutButton";

export function SiteHeader() {
  return (
    <header className="app-glass-header sticky top-0 z-40 border-b border-slate-900/[0.06] dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3.5">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span
              className="app-hero-glow flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm"
              aria-hidden
            >
              L
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
              {siteName}
            </span>
          </Link>
          <div className="hidden w-full max-w-md md:block">
            <SearchBar compact />
          </div>
          <LogoutButton />
        </div>
        <nav className="-mx-2 flex flex-wrap gap-1 overflow-x-auto text-sm">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="app-pill rounded-full px-3.5 py-1.5 font-medium text-slate-600 hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
