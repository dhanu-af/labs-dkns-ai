import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

const COOKIE_NAME = "labs_session";
const secret = new TextEncoder().encode(process.env.SESSION_SECRET ?? "dev-only-secret");

const SESSION_MAX_AGE_REMEMBER = 60 * 60 * 24 * 30; // 30 days
const SESSION_MAX_AGE_DEFAULT = 60 * 60 * 24; // 1 day

export type SessionPayload = {
  userId: string;
  username: string;
  role: UserRole;
  mustChangePassword: boolean;
};

export function isSuperAdmin(role: UserRole) {
  return role === "SUPER_ADMIN";
}

export function isViewer(role: UserRole) {
  return role === "VIEWER";
}

// VIEWER can browse the site but cannot edit content, see /admin/* pages, or
// download documents; SUPER_ADMIN and EDITOR both retain today's full access.
export function canEditContent(role: UserRole) {
  return role !== "VIEWER";
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function createSession(payload: SessionPayload, remember = false) {
  const maxAge = remember ? SESSION_MAX_AGE_REMEMBER : SESSION_MAX_AGE_DEFAULT;
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + maxAge)
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function login(username: string, password: string, remember = false) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return { error: "Invalid User ID or password" as const };

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return { error: "Invalid User ID or password" as const };

  await createSession(
    { userId: user.id, username: user.username, role: user.role, mustChangePassword: user.mustChangePassword },
    remember,
  );
  return { ok: true as const };
}

export async function logout() {
  await destroySession();
}

// Server actions render their own errors, so they can't rely on the
// (protected) layout's redirect -- a form's action id is visible in the
// rendered HTML and can be invoked directly, bypassing the page. Every
// mutating admin action must call this first as defense in depth.
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

// User management (creating/deleting accounts) is restricted to
// SUPER_ADMIN; everyone else still gets full content edit access via
// requireSession() above.
export async function requireSuperAdmin(): Promise<SessionPayload> {
  const session = await requireSession();
  if (!isSuperAdmin(session.role)) throw new Error("Super admin access required");
  return session;
}

// Content-mutating actions are open to EDITOR/SUPER_ADMIN, closed to VIEWER.
// Same defense-in-depth rationale as requireSession() above: a mutating
// action's form id is visible in rendered HTML and can be invoked directly.
export async function requireEditorOrAbove(): Promise<SessionPayload> {
  const session = await requireSession();
  if (isViewer(session.role)) throw new Error("Editor access required");
  return session;
}
