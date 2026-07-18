"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession, requireEditorOrAbove } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import type { KbCategory } from "@prisma/client";

// Rule-based (not LLM-powered) keyword/token-overlap matcher -- ported from
// the "Dhanu AI" feature on the BlendCaps Ops Platform (a separate project),
// which uses the same generic algorithm. Weighs the title and keywords
// fields higher than the free-text answer so an entry whose keywords match
// the question ranks above one that merely mentions the same word once in a
// long answer.

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "to", "of", "in", "on",
  "for", "and", "or", "how", "what", "why", "when", "do", "does", "did", "it", "its",
  "not", "with", "at", "my", "i", "we", "our", "please", "help", "can", "should", "will",
]);

/** Light stemming so "results"/"result" and "readings"/"reading" etc. still match. */
function stem(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.length > 4 && /(s|x|ch|sh)es$/.test(word)) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
    .map(stem);
}

function scoreEntry(questionTokens: string[], entry: { title: string; keywords: string; answer: string; cause: string | null }) {
  const titleTokens = new Set(tokenize(entry.title));
  const keywordTokens = new Set(entry.keywords.split(",").flatMap((k) => tokenize(k)));
  const bodyTokens = new Set(tokenize(`${entry.cause ?? ""} ${entry.answer}`));

  let score = 0;
  for (const t of questionTokens) {
    if (titleTokens.has(t)) score += 3;
    if (keywordTokens.has(t)) score += 3;
    if (bodyTokens.has(t)) score += 1;
  }
  return score;
}

export type KbMatch = {
  id: string;
  category: KbCategory;
  title: string;
  cause: string | null;
  answer: string;
  source: string | null;
  score: number;
};

export async function askNanduni(question: string): Promise<{ matches: KbMatch[]; confident: boolean }> {
  const session = await requireSession();

  const questionTokens = tokenize(question);
  const entries = await prisma.knowledgeEntry.findMany();

  const scored = entries
    .map((e) => ({
      id: e.id,
      category: e.category,
      title: e.title,
      cause: e.cause,
      answer: e.answer,
      source: e.source,
      score: scoreEntry(questionTokens, e),
    }))
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const best = scored[0];
  const confident = questionTokens.length > 0 && !!best && best.score >= 5;

  await prisma.kbQuestionLog.create({
    data: {
      question,
      matchedId: best?.id,
      matchTitle: best?.title,
      matchScore: best?.score ?? 0,
      askedByName: session.username,
    },
  });

  return { matches: scored, confident };
}

function optionalString(raw: FormDataEntryValue | null): string | null {
  const value = String(raw ?? "").trim();
  return value ? value : null;
}

type ActionState = { error?: string } | undefined;

export async function saveKbEntry(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireEditorOrAbove();

  const id = optionalString(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "") as KbCategory;
  const keywords = String(formData.get("keywords") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  if (!title || !category || !keywords || !answer) {
    return { error: "Title, category, keywords, and answer are required." };
  }

  const base = {
    category,
    title,
    slug: optionalString(formData.get("slug")) ?? slugify(title),
    keywords,
    cause: optionalString(formData.get("cause")),
    answer,
    source: optionalString(formData.get("source")),
  };

  try {
    if (id) {
      await prisma.knowledgeEntry.update({ where: { id }, data: base });
    } else {
      await prisma.knowledgeEntry.create({ data: base });
    }
  } catch {
    return { error: "Could not save entry. Slug may already be in use." };
  }

  redirect("/admin/knowledge-base");
}

export async function deleteKbEntry(id: string) {
  await requireEditorOrAbove();
  await prisma.knowledgeEntry.delete({ where: { id } });
  redirect("/admin/knowledge-base");
}
