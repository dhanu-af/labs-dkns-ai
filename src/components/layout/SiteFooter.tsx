import Link from "next/link";
import { footerLinks, primaryNav, siteName, siteTagline } from "@/lib/site-config";
import { IconTile } from "@/components/ui/IconTile";
import { PhaseBadge } from "@/components/ui/PhaseBadge";

// Deliberately a darker "footer well" in both light and dark mode -- a
// common SaaS pattern (Vercel, Linear) that reads as a distinct zone rather
// than a continuation of the body background, so text here is hardcoded
// light rather than following the site's own dark: variants.
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-surface-footer text-white/70">
      <div className="app-dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <IconTile size="sm">L</IconTile>
              <span className="text-[15px] font-semibold tracking-tight text-white">{siteName}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/60">{siteTagline}</p>
            <p className="mt-3 max-w-sm text-sm text-white/40">
              Built for people who run labs, not just read about them.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Platform</p>
            <ul className="mt-3 space-y-2 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href} className="flex items-center gap-2">
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                  <PhaseBadge phase={item.phase} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Encrypted connection · session-based authentication
          </p>
        </div>
      </div>
    </footer>
  );
}
