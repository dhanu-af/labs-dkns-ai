import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireSession, isSuperAdmin } from "@/lib/auth";
import { UserForm } from "@/components/admin/UserForm";

export const metadata: Metadata = { title: "Admin — New User" };
export const dynamic = "force-dynamic";

export default async function NewUserPage() {
  const session = await requireSession();
  if (!isSuperAdmin(session.role)) redirect("/admin");

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">New account</h1>
      <div className="mt-6 max-w-md">
        <UserForm />
      </div>
    </div>
  );
}
