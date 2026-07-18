import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md";

const base =
  "app-pill inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full font-medium transition disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-3.5 py-1.5 text-sm",
};

const variants: Record<Variant, string> = {
  primary: "app-hero-glow text-white hover:brightness-110",
  secondary:
    "border border-slate-900/[0.08] text-slate-600 hover:border-slate-900/15 hover:bg-slate-900/[0.04] hover:text-slate-900 dark:border-white/10 dark:text-white/60 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white",
  ghost:
    "text-slate-600 hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white",
  destructive:
    "border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-400/20 dark:text-red-400 dark:hover:bg-red-500/10",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

// Consolidates the hand-copied `app-pill rounded-full border ...` string
// that appeared near-verbatim in the Admin link, LogoutButton, and
// HeroSearch's quick-links. Renders as a Link when `href` is given,
// otherwise as a native <button>.
export function Button({ variant = "secondary", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = clsx(base, sizes[size], variants[variant], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button type={buttonRest.type ?? "button"} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
