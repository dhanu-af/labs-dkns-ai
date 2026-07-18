"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireEditorOrAbove } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import type { ContentStatus, GuideSection } from "@prisma/client";

type ActionState = { error?: string } | undefined;

function parseJsonField(raw: FormDataEntryValue | null, fieldLabel: string): unknown {
  const text = String(raw ?? "").trim();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${fieldLabel} must be valid JSON (or left blank).`);
  }
}

function optionalString(raw: FormDataEntryValue | null): string | null {
  const value = String(raw ?? "").trim();
  return value ? value : null;
}

// ---------------------------------------------------------------------------
// Equipment
// ---------------------------------------------------------------------------

export async function saveEquipment(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireEditorOrAbove();

  const id = optionalString(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  if (!name || !categoryId) return { error: "Name and category are required." };

  let specifications: unknown;
  let manufacturers: unknown;
  try {
    specifications = parseJsonField(formData.get("specifications"), "Specifications");
    manufacturers = parseJsonField(formData.get("manufacturers"), "Manufacturers");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Invalid JSON." };
  }

  const standardRefs = formData.getAll("standardIds").map((sid) => ({ id: String(sid) }));

  const base = {
    name,
    slug: optionalString(formData.get("slug")) ?? slugify(name),
    status: String(formData.get("status") ?? "PUBLISHED") as ContentStatus,
    summary: String(formData.get("summary") ?? ""),
    overview: String(formData.get("overview") ?? ""),
    specifications: specifications as never,
    applications: optionalString(formData.get("applications")),
    manufacturers: manufacturers as never,
    maintenanceNotes: optionalString(formData.get("maintenanceNotes")),
    safetyNotes: optionalString(formData.get("safetyNotes")),
    buyingGuide: optionalString(formData.get("buyingGuide")),
    categoryId,
  };

  try {
    if (id) {
      await prisma.equipment.update({ where: { id }, data: { ...base, standards: { set: standardRefs } } });
    } else {
      await prisma.equipment.create({ data: { ...base, standards: { connect: standardRefs } } });
    }
  } catch {
    return { error: "Could not save equipment. Slug may already be in use." };
  }

  redirect("/admin/equipment");
}

export async function deleteEquipment(id: string) {
  await requireEditorOrAbove();
  await prisma.equipment.delete({ where: { id } });
  redirect("/admin/equipment");
}

// ---------------------------------------------------------------------------
// Methods
// ---------------------------------------------------------------------------

export async function saveMethod(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireEditorOrAbove();

  const id = optionalString(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  if (!name || !categoryId) return { error: "Name and category are required." };

  const standardRefs = formData.getAll("standardIds").map((sid) => ({ id: String(sid) }));

  const base = {
    name,
    slug: optionalString(formData.get("slug")) ?? slugify(name),
    status: String(formData.get("status") ?? "PUBLISHED") as ContentStatus,
    summary: String(formData.get("summary") ?? ""),
    principle: String(formData.get("principle") ?? ""),
    procedure: String(formData.get("procedure") ?? ""),
    requiredEquipment: optionalString(formData.get("requiredEquipment")),
    applications: optionalString(formData.get("applications")),
    troubleshooting: optionalString(formData.get("troubleshooting")),
    categoryId,
  };

  try {
    if (id) {
      await prisma.method.update({ where: { id }, data: { ...base, standards: { set: standardRefs } } });
    } else {
      await prisma.method.create({ data: { ...base, standards: { connect: standardRefs } } });
    }
  } catch {
    return { error: "Could not save method. Slug may already be in use." };
  }

  redirect("/admin/methods");
}

export async function deleteMethod(id: string) {
  await requireEditorOrAbove();
  await prisma.method.delete({ where: { id } });
  redirect("/admin/methods");
}

// ---------------------------------------------------------------------------
// Glossary
// ---------------------------------------------------------------------------

export async function saveGlossaryTerm(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireEditorOrAbove();

  const id = optionalString(formData.get("id"));
  const term = String(formData.get("term") ?? "").trim();
  const definition = String(formData.get("definition") ?? "").trim();
  if (!term || !definition) return { error: "Term and definition are required." };

  const data = {
    term,
    slug: optionalString(formData.get("slug")) ?? slugify(term),
    definition,
  };

  try {
    if (id) {
      await prisma.glossaryTerm.update({ where: { id }, data });
    } else {
      await prisma.glossaryTerm.create({ data });
    }
  } catch {
    return { error: "Could not save term. Slug may already be in use." };
  }

  redirect("/admin/glossary");
}

export async function deleteGlossaryTerm(id: string) {
  await requireEditorOrAbove();
  await prisma.glossaryTerm.delete({ where: { id } });
  redirect("/admin/glossary");
}

// ---------------------------------------------------------------------------
// Standards
// ---------------------------------------------------------------------------

export async function saveStandard(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireEditorOrAbove();

  const id = optionalString(formData.get("id"));
  const code = String(formData.get("code") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!code || !title) return { error: "Code and title are required." };

  const data = {
    code,
    title,
    summary: optionalString(formData.get("summary")),
    url: optionalString(formData.get("url")),
    region: optionalString(formData.get("region")),
  };

  try {
    if (id) {
      await prisma.standardReference.update({ where: { id }, data });
    } else {
      await prisma.standardReference.create({ data });
    }
  } catch {
    return { error: "Could not save standard. Code may already be in use." };
  }

  redirect("/admin/standards");
}

export async function deleteStandard(id: string) {
  await requireEditorOrAbove();
  await prisma.standardReference.delete({ where: { id } });
  redirect("/admin/standards");
}

// ---------------------------------------------------------------------------
// Safety guide pages
// ---------------------------------------------------------------------------

export async function saveGuidePage(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireEditorOrAbove();

  const id = optionalString(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title || !body) return { error: "Title and body are required." };

  const data = {
    section: "SAFETY" as GuideSection,
    title,
    slug: optionalString(formData.get("slug")) ?? slugify(title),
    summary: optionalString(formData.get("summary")),
    body,
    order: Number(formData.get("order") ?? 0) || 0,
    status: String(formData.get("status") ?? "PUBLISHED") as ContentStatus,
  };

  try {
    if (id) {
      await prisma.guidePage.update({ where: { id }, data });
    } else {
      await prisma.guidePage.create({ data });
    }
  } catch {
    return { error: "Could not save page. Slug may already be in use." };
  }

  redirect("/admin/safety");
}

export async function deleteGuidePage(id: string) {
  await requireEditorOrAbove();
  await prisma.guidePage.delete({ where: { id } });
  redirect("/admin/safety");
}
