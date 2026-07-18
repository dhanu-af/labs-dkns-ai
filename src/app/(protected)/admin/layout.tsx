import { redirect } from "next/navigation";
import { requireSession, isViewer } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  if (isViewer(session.role)) redirect("/");

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <AdminNav />
      {children}
    </div>
  );
}
