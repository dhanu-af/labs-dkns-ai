"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  login as loginUser,
  logout as logoutUser,
  createSession,
  hashPassword,
  requireSession,
} from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";
  const next = String(formData.get("next") ?? "/");

  if (!username || !password) {
    return { error: "Please enter your User ID and password." };
  }

  const result = await loginUser(username, password, remember);
  if ("error" in result) {
    return { error: result.error };
  }

  redirect(next.startsWith("/") ? next : "/");
}

export async function logoutAction() {
  await logoutUser();
  redirect("/login");
}

export async function changePasswordAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const session = await requireSession();
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: session.userId },
    data: { passwordHash, mustChangePassword: false },
  });

  // Re-issue the session cookie so the redirect gate in (protected)/layout.tsx
  // (which reads mustChangePassword off the JWT, not the DB) doesn't bounce
  // the user straight back to /change-password on their next page load.
  await createSession({ ...session, mustChangePassword: false });

  redirect("/");
}
