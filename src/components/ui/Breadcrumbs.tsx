import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-black/50 dark:text-white/50">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-black/30 dark:text-white/30">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-black dark:hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className="text-black/80 dark:text-white/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
