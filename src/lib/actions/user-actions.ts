"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, requireSuperAdmin } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

type ActionState = { error?: string } | undefined;

const VALID_ROLES: UserRole[] = ["SUPER_ADMIN", "EDITOR", "VIEWER"];

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
  if (!VALID_ROLES.includes(role)) {
    return { error: "Invalid role." };
  }

  const passwordHash = await hashPassword(password);

  try {
    // New accounts must change this password on their first login.
    await prisma.user.create({ data: { username, passwordHash, role, mustChangePassword: true } });
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

export async function resetUserPassword(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSuperAdmin();

  const id = String(formData.get("id") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  if (!id) {
    return { error: "Missing user." };
  }
  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const passwordHash = await hashPassword(newPassword);
  // Force the user to set their own password again next time they log in.
  await prisma.user.update({ where: { id }, data: { passwordHash, mustChangePassword: true } });

  redirect("/admin/users");
}
