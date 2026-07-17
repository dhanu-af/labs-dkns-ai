import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteName, siteTagline } from "@/lib/site-config";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">About {siteName}</h1>
      <p className="mt-4 text-black/70 dark:text-white/70">{siteTagline}</p>
      <p className="mt-4 text-black/70 dark:text-white/70">
        {siteName} is a reference hub for lab equipment, methods, SOPs, and lab management guidance — built to help
        analysts, lab managers, and technicians find accurate, practical information in one place.
      </p>
    </div>
  );
}
