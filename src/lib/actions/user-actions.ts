"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, requireSuperAdmin } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

type ActionState = { error?: string } | undefined;

export async function createUserAccount(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSuperAdmin();

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "EDITOR") as UserRole;

  if (!username || !password) {
    return { error: "Username and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const passwordHash = await hashPassword(password);

  try {
    await prisma.user.create({ data: { username, passwordHash, role } });
  } catch {
    return { error: "That username is already taken." };
  }

  redirect("/admin/users");
}

export async function deleteUserAccount(id: string) {
  const session = await requireSuperAdmin();
  if (id === session.userId) {
    redirect("/admin/users?error=self-delete");
  }
  await prisma.user.delete({ where: { id } });
  redirect("/admin/users");
}
