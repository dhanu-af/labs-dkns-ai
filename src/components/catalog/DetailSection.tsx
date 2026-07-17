export function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-black/10 py-6 first:border-t-0 first:pt-0 dark:border-white/10">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">{title}</h2>
      <div className="prose-sm mt-3 whitespace-pre-line text-black/80 dark:text-white/80">{children}</div>
    </section>
  );
}
