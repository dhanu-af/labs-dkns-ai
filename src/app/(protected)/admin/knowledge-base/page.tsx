import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteKbEntry } from "@/lib/actions/kb-actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { KB_CATEGORY_LABEL, KB_CATEGORY_ORDER } from "@/lib/kb-labels";

export const metadata: Metadata = { title: "Admin — Knowledge Base" };
export const dynamic = "force-dynamic";

export default async function AdminKnowledgeBasePage() {
  const [entries, recentQuestions] = await Promise.all([
    prisma.knowledgeEntry.findMany({ orderBy: [{ category: "asc" }, { title: "asc" }] }),
    prisma.kbQuestionLog.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
  ]);

  const grouped = new Map<string, typeof entries>();
  for (const entry of entries) {
    if (!grouped.has(entry.category)) grouped.set(entry.category, []);
    grouped.get(entry.category)!.push(entry);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Ask Nanduni — Knowledge Base</h1>
        <Link href="/admin/knowledge-base/new" className="app-hero-glow rounded-full px-4 py-2 text-sm font-semibold text-white">
          + New entry
        </Link>
      </div>
      <p className="mt-2 text-sm text-slate-500 dark:text-white/50">
        Every question asked on <Link href="/ask-nanduni" className="underline">/ask-nanduni</Link> is logged below —
        use it to spot unanswered or low-confidence questions worth adding as new entries.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-900/[0.07] bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Recent questions asked</h2>
        {recentQuestions.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500 dark:text-white/50">No questions asked yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {recentQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border border-slate-900/[0.06] bg-slate-50 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/[0.02]"
              >
                <p className="text-slate-800 dark:text-white/85">&ldquo;{q.question}&rdquo;</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-white/50">
                  {q.askedByName} · {q.createdAt.toLocaleString("en-AU")} ·{" "}
                  {q.matchTitle ? `matched: ${q.matchTitle} (score ${q.matchScore})` : "no match found"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 space-y-8">
        {KB_CATEGORY_ORDER.filter((c) => grouped.has(c)).map((category) => (
          <div key={category}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
              {KB_CATEGORY_LABEL[category]}
            </h2>
            <div className="mt-2 divide-y divide-slate-900/[0.07] rounded-2xl border border-slate-900/[0.07] bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
              {grouped.get(category)!.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                    <p className="line-clamp-1 text-xs text-slate-500 dark:text-white/50">{item.answer}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/admin/knowledge-base/${item.id}`}
                      className="rounded-lg border border-slate-900/10 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteKbEntry.bind(null, item.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {entries.length === 0 && <p className="text-sm text-slate-500 dark:text-white/50">No entries yet.</p>}
      </div>
    </div>
  );
}
