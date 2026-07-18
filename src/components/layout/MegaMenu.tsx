import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { CategoryNode } from "@/lib/content/categories";

interface MegaMenuProps {
  label: string;
  href: string;
  tree: CategoryNode[];
}

// Category/subcategory links only for v1 (no item-photo previews yet --
// that needs a new query and is a deliberate fast-follow). Pure CSS
// hover/focus-within reveal, so this stays a server component: no client JS
// needed for a desktop-only dropdown (mobile gets its own drawer instead).
export function MegaMenu({ label, href, tree }: MegaMenuProps) {
  return (
    <div className="group relative">
      <Link
        href={href}
        className="app-pill inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 font-medium text-slate-600 hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white"
      >
        {label}
        <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>

      <div className="invisible absolute left-0 top-full z-50 w-[520px] max-w-[90vw] translate-y-1 rounded-2xl border border-slate-900/[0.08] bg-white p-5 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100 dark:border-white/10 dark:bg-[#12141c]">
        {tree.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-white/50">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            {tree.map((group) => (
              <div key={group.id}>
                <Link
                  href={`${href}/${group.slug}`}
                  className="text-sm font-semibold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-violet-400"
                >
                  {group.name}
                </Link>
                {group.children.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {group.children.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={`${href}/${sub.slug}`}
                          className="block text-sm text-slate-600 hover:text-indigo-600 dark:text-white/60 dark:hover:text-white"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          View all {label}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
