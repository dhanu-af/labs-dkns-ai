import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession, isSuperAdmin } from "@/lib/auth";
import { deleteUserAccount } from "@/lib/actions/user-actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm";

export const metadata: Metadata = { title: "Admin — Users" };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await requireSession();
  if (!isSuperAdmin(session.role)) redirect("/admin");

  const { error } = await searchParams;
  const users = await prisma.user.findMany({ orderBy: { username: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Users</h1>
        <Link href="/admin/users/new" className="app-hero-glow rounded-full px-4 py-2 text-sm font-semibold text-white">
          + New account
        </Link>
      </div>

      {error === "self-delete" && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300">
          You can&apos;t delete the account you&apos;re currently signed in with.
        </div>
      )}

      <div className="mt-6 divide-y divide-slate-900/[0.07] rounded-2xl border border-slate-900/[0.07] bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                {u.username}
                {u.id === session.userId && <span className="ml-2 text-xs text-slate-400">(you)</span>}
              </p>
              <p className="text-xs text-slate-500 dark:text-white/50">
                {u.role === "SUPER_ADMIN" ? "Super admin" : u.role === "VIEWER" ? "Viewer" : "Editor"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ResetPasswordForm userId={u.id} />
              <DeleteButton
                action={deleteUserAccount.bind(null, u.id)}
                confirmLabel={`Delete the account "${u.username}"? This cannot be undone.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
