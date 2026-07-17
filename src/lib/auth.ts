import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "labs_session";
const secret = new TextEncoder().encode(process.env.SESSION_SECRET ?? "dev-only-secret");

const SESSION_MAX_AGE_REMEMBER = 60 * 60 * 24 * 30; // 30 days
const SESSION_MAX_AGE_DEFAULT = 60 * 60 * 24; // 1 day

export type SessionPayload = {
  username: string;
};

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

// Single shared credential, checked against env vars -- there is no
// multi-user model for this site, so a User table would be unused
// complexity. SITE_PASSWORD must be set; without it every login is
// rejected rather than falling back to a guessable default.
export async function login(username: string, password: string, remember = false) {
  const expectedUsername = process.env.SITE_USERNAME ?? "admin";
  const expectedPassword = process.env.SITE_PASSWORD;

  if (!expectedPassword) {
    console.error("SITE_PASSWORD is not set -- rejecting all logins.");
    return { error: "Login is not configured yet." as const };
  }

  if (username !== expectedUsername || password !== expectedPassword) {
    return { error: "Invalid User ID or password" as const };
  }

  await createSession({ username }, remember);
  return { ok: true as const };
}

export async function logout() {
  await destroySession();
}
