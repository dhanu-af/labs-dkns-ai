import Link from "next/link";
import { footerLinks, siteName, siteTagline } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-black/60 dark:text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-black/80 dark:text-white/80">{siteName}</p>
          <p>{siteTagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-black dark:hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
