import Link from "next/link";

export function ItemCard({
  href,
  title,
  summary,
  tag,
}: {
  href: string;
  title: string;
  summary: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-black/10 p-4 transition hover:border-black/30 hover:bg-black/[0.02] dark:border-white/10 dark:hover:border-white/30 dark:hover:bg-white/[0.03]"
    >
      {tag && (
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">{tag}</p>
      )}
      <p className="font-medium">{title}</p>
      <p className="mt-1 line-clamp-2 text-sm text-black/60 dark:text-white/60">{summary}</p>
    </Link>
  );
}
