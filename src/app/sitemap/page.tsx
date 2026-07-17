import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PhaseBadge } from "@/components/ui/PhaseBadge";
import { primaryNav, footerLinks } from "@/lib/site-config";

export const metadata: Metadata = { title: "Sitemap" };

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sitemap" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Sitemap</h1>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
        Main sections
      </h2>
      <ul className="mt-3 divide-y divide-black/10 dark:divide-white/10">
        <li className="flex items-center justify-between py-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {primaryNav.map((item) => (
          <li key={item.href} className="flex items-center justify-between py-2">
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
            <PhaseBadge phase={item.phase} />
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">Footer</h2>
      <ul className="mt-3 divide-y divide-black/10 dark:divide-white/10">
        {footerLinks
          .filter((l) => l.href !== "/sitemap")
          .map((link) => (
            <li key={link.href} className="py-2">
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
