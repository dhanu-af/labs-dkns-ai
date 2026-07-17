import Link from "next/link";

export function EditLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="app-pill inline-flex items-center gap-1.5 rounded-full border border-slate-900/[0.08] px-3 py-1.5 text-sm font-medium text-slate-600 hover:border-indigo-300/60 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:text-white/65 dark:hover:border-violet-400/40 dark:hover:bg-violet-500/10 dark:hover:text-white"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20h4L18 10l-4-4L4 16v4Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14 6l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Edit
    </Link>
  );
}
