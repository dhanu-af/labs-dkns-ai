import clsx from "clsx";

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
  as?: "div" | "section";
}

// Consolidates the repeated `mx-auto max-w-* px-6` wrapper duplicated
// across ~15 page files.
export function Container({ children, className, size = "default", as = "div" }: ContainerProps) {
  const Tag = as;
  return <Tag className={clsx("mx-auto px-6", sizes[size], className)}>{children}</Tag>;
}
