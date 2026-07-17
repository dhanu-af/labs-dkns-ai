import Link from "next/link";

const sections = [
  { label: "Dashboard", href: "/admin" },
  { label: "Equipment", href: "/admin/equipment" },
  { label: "Methods", href: "/admin/methods" },
  { label: "Glossary", href: "/admin/glossary" },
  { label: "Standards", href: "/admin/standards" },
  { label: "Safety Guides", href: "/admin/safety" },
];

export function AdminNav() {
  return (
    <nav className="-mx-1 mb-8 flex flex-wrap gap-1 border-b border-slate-900/[0.07] pb-4 dark:border-white/10">
      {sections.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="app-pill rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white"
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
