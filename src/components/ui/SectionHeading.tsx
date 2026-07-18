import Link from "next/link";
import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  /** Centers the heading block (used on the homepage's ModuleCards intro). */
  centered?: boolean;
}

// The "h2 + optional description + 'View all ->' link" header repeated in
// FeaturedCategories, LatestArticles, and ModuleCards.
export function SectionHeading({
  title,
  description,
  viewAllHref,
  viewAllLabel = "View all",
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-end justify-between gap-4",
        centered && "flex-col items-center text-center",
        className,
      )}
    >
      <div className={clsx(centered && "max-w-xl")}>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">{title}</h2>
        {description && <p className="mt-2 text-slate-600 dark:text-white/60">{description}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          {viewAllLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}
