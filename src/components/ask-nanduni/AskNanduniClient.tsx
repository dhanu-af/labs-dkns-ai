"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { askNanduni, type KbMatch } from "@/lib/actions/kb-actions";
import { KB_CATEGORY_LABEL, KB_CATEGORY_TONE } from "@/lib/kb-labels";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";

const SAMPLE_QUESTIONS = [
  "HPLC peak is tailing, what's the cause?",
  "How often should I calibrate the analytical balance?",
  "What PPE do I need before handling solvents?",
  "My UV-Vis absorbance reading is out of range",
];

function AnswerCard({ match, highlight }: { match: KbMatch; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-indigo-300/60 bg-indigo-50/60 dark:border-violet-400/30 dark:bg-violet-500/[0.06]"
          : "border-slate-900/[0.07] bg-white dark:border-white/10 dark:bg-white/[0.03]"
      }`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge tone={KB_CATEGORY_TONE[match.category]}>{KB_CATEGORY_LABEL[match.category]}</Badge>
        {highlight && <Badge tone="info">Best match</Badge>}
      </div>
      <h3 className="mb-1.5 font-semibold text-slate-900 dark:text-white">{match.title}</h3>
      {match.cause && (
        <p className="mb-1.5 text-sm text-slate-600 dark:text-white/60">
          <span className="font-medium text-slate-800 dark:text-white/85">Likely cause: </span>
          {match.cause}
        </p>
      )}
      <p className="whitespace-pre-line text-sm text-slate-700 dark:text-white/80">{match.answer}</p>
      {match.source && <p className="mt-2 text-xs text-slate-500 dark:text-white/50">Source: {match.source}</p>}
    </div>
  );
}

export function AskNanduniClient() {
  const [question, setQuestion] = useState("");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ matches: KbMatch[]; confident: boolean } | null>(null);

  function ask(q: string) {
    if (!q.trim()) return;
    startTransition(async () => {
      const res = await askNanduni(q);
      setResult(res);
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-3">
          <IconTile size="sm" gradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)">
            <Sparkles size={16} />
          </IconTile>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Ask Nanduni AI</h2>
            <p className="text-xs text-slate-500 dark:text-white/50">
              Answers grounded in Nanduni&rsquo;s expertise — HPLC, LC-MS, calibration, method development, and GMP/GLP
              compliance.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(question);
          }}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask Nanduni anything about equipment, methods, or compliance…"
            />
          </div>
          <Button type="submit" variant="primary" disabled={pending || !question.trim()}>
            {pending ? "Searching…" : "Ask"}
          </Button>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuestion(s);
                ask(s);
              }}
              className="app-pill rounded-full border border-slate-900/[0.08] px-3 py-1 text-xs text-slate-600 hover:border-indigo-300/60 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:text-white/60 dark:hover:border-violet-400/40 dark:hover:bg-violet-500/10 dark:hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      </Card>

      {result && (
        <div className="space-y-3">
          {result.matches.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-900/15 bg-white/40 p-6 text-center dark:border-white/15 dark:bg-white/[0.02]">
              <p className="text-sm text-slate-500 dark:text-white/50">
                No matching answer found yet. Your question has been logged — the knowledge base grows over time as
                more entries are added.
              </p>
            </div>
          )}
          {result.matches.length > 0 && !result.confident && (
            <div className="rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300">
              Not fully sure this matches — closest entries are shown below. Your question has been logged for
              follow-up.
            </div>
          )}
          {result.matches.map((m, i) => (
            <AnswerCard key={m.id} match={m} highlight={result.confident && i === 0} />
          ))}
        </div>
      )}

      <p className="text-sm text-slate-500 dark:text-white/50">
        <Link href="/admin/knowledge-base" className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-violet-400 dark:hover:text-violet-300">
          Manage knowledge base →
        </Link>
      </p>
    </div>
  );
}
