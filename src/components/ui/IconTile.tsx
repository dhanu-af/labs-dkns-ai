import clsx from "clsx";

const sizes = {
  sm: "h-8 w-8 rounded-lg text-sm",
  md: "h-11 w-11 rounded-xl text-base",
} as const;

interface IconTileProps {
  children: React.ReactNode;
  size?: keyof typeof sizes;
  /** CSS background value, e.g. a linear-gradient(). Defaults to the app-hero-glow gradient. */
  gradient?: string;
  className?: string;
}

// The gradient-square icon-tile pattern used for the header/login "L" logo
// and ModuleCards' 4 module icons.
export function IconTile({ children, size = "md", gradient, className }: IconTileProps) {
  return (
    <span
      className={clsx(
        !gradient && "app-hero-glow",
        sizes[size],
        "inline-flex shrink-0 items-center justify-center font-bold text-white shadow-sm",
        className,
      )}
      style={gradient ? { background: gradient } : undefined}
      aria-hidden
    >
      {children}
    </span>
  );
}
