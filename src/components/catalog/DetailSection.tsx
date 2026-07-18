export function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-2xl border border-slate-900/[0.07] bg-white p-5 first:mt-0 dark:border-white/10 dark:bg-white/[0.03]">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
        <span className="app-hero-glow h-1.5 w-1.5 rounded-full" aria-hidden />
        {title}
      </h2>
      <div className="prose-sm mt-3 whitespace-pre-line text-slate-700 dark:text-white/80">{children}</div>
    </section>
  );
}
