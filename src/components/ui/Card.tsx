import Link from "next/link";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  /** Set false for edge-to-edge content (e.g. a full-bleed top color bar). */
  padded?: boolean;
}

// Encapsulates the .app-ring-wrap / .app-ring-inner / .app-card-hover
// three-part gradient-border-on-hover pattern that ModuleCards hand-assembles
// today (and FeaturedCategories/ItemCard partially repeat). Renders as a
// Link when `href` is given, otherwise a plain div.
export function Card({ children, className, href, padded = true }: CardProps) {
  const inner = (
    <div
      className={clsx(
        "app-ring-inner app-card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-900/[0.07] bg-white dark:border-white/10 dark:bg-white/[0.03]",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <div className="app-ring-wrap h-full">
        <Link href={href} className="block h-full">
          {inner}
        </Link>
      </div>
    );
  }

  return <div className="app-ring-wrap h-full">{inner}</div>;
}
