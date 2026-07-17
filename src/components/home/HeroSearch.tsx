import Link from "next/link";
import { SearchBar } from "@/components/layout/SearchBar";

const quickLinks = [
  { label: "Browse Equipment", href: "/equipment" },
  { label: "Browse Methods", href: "/methods" },
  { label: "Lab Management", href: "/lab-management" },
];

export function HeroSearch() {
  return (
    <section className="border-b border-black/10 bg-gradient-to-b from-black/[0.03] to-transparent px-6 py-16 dark:border-white/10 dark:from-white/[0.04]">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Everything your lab needs to know
        </h1>
        <p className="mt-4 text-black/60 dark:text-white/60">
          Equipment specs, methods, SOPs, and lab management guidance — in one reference hub.
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          <SearchBar />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-black/15 px-4 py-1.5 transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
