import Link from "next/link";
import clsx from "clsx";

interface PillProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const pillClasses =
  "app-pill inline-flex items-center rounded-full border border-slate-900/[0.08] px-3 py-1 text-xs font-medium text-slate-600 hover:border-slate-900/15 hover:bg-slate-900/[0.04] hover:text-slate-900 dark:border-white/10 dark:text-white/60 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white";

// Small tag-style chip, used for subcategory links (FeaturedCategories,
// mega-menu panels) -- distinct from Button, which is for primary CTAs.
export function Pill({ children, className, href }: PillProps) {
  const classes = clsx(pillClasses, className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <span className={classes}>{children}</span>;
}
