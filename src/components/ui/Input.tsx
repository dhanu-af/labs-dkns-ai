import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

// Consolidates the ad hoc `rounded-md border border-black/15` inputs
// duplicated across the resource calculators and the `.admin-input` class,
// into one premium-styled, focus-ring-consistent field.
export function Input({ label, className, containerClassName, id, ...rest }: InputProps) {
  const input = (
    <input
      id={id}
      className={clsx(
        "w-full rounded-lg border border-slate-900/[0.1] bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:border-violet-400/50 dark:focus:ring-violet-500/15",
        className,
      )}
      {...rest}
    />
  );

  if (!label) return input;

  return (
    <label className={clsx("block", containerClassName)} htmlFor={id}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-white/70">{label}</span>
      {input}
    </label>
  );
}
