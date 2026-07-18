import Link from "next/link";
import { primaryNav, siteName } from "@/lib/site-config";
import { SearchBar } from "@/components/layout/SearchBar";
import { LogoutButton } from "@/components/layout/LogoutButton";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { IconTile } from "@/components/ui/IconTile";
import { listEquipmentCategories } from "@/lib/content/equipment";
import { listMethodCategories } from "@/lib/content/methods";

export async function SiteHeader() {
  const [equipmentTree, methodTree] = await Promise.all([listEquipmentCategories(), listMethodCategories()]);

  return (
    <header
      className="app-glass-header sticky top-0 z-40 border-b border-slate-900/[0.06] dark:border-white/10"
      style={{ backdropFilter: "blur(16px) saturate(160%)", WebkitBackdropFilter: "blur(16px) saturate(160%)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3.5">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <IconTile size="sm">L</IconTile>
            <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
              {siteName}
            </span>
          </Link>
          <div className="hidden w-full max-w-md md:block">
            <SearchBar compact />
          </div>
          <Link
            href="/admin"
            className="app-pill hidden shrink-0 rounded-full border border-slate-900/[0.08] px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:border-slate-900/15 hover:bg-slate-900/[0.04] hover:text-slate-900 sm:inline-block dark:border-white/10 dark:text-white/60 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
          >
            Admin
          </Link>
          <ThemeToggle />
          <LogoutButton />
          <MobileNav />
        </div>
        <nav className="-mx-2 hidden flex-wrap gap-1 text-sm md:flex">
          {primaryNav.map((item) =>
            item.megaMenu ? (
              <MegaMenu
                key={item.href}
                label={item.label}
                href={item.href}
                tree={item.href === "/equipment" ? equipmentTree : methodTree}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="app-pill rounded-full px-3.5 py-1.5 font-medium text-slate-600 hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
