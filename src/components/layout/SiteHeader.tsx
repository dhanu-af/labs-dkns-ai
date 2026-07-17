import Link from "next/link";
import { primaryNav, siteName } from "@/lib/site-config";
import { SearchBar } from "@/components/layout/SearchBar";
import { LogoutButton } from "@/components/layout/LogoutButton";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {siteName}
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
              className="rounded-md px-3 py-1.5 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
