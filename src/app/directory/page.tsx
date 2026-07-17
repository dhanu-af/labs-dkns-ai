import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { listDirectoryListings } from "@/lib/content/directory";
import { ItemCard } from "@/components/catalog/ItemCard";

export const metadata: Metadata = { title: "Directory" };

export default async function DirectoryPage() {
  const listings = await listDirectoryListings();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory" }]} />
      {listings.length === 0 ? (
        <ComingSoon
          title="Directory"
          phase={3}
          description="Equipment manufacturers & suppliers, testing/certification bodies, and training providers."
          items={["Equipment manufacturers & suppliers", "Testing/certification bodies", "Training providers"]}
        />
      ) : (
        <div className="pb-10">
          <h1 className="text-3xl font-semibold tracking-tight">Directory</h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ItemCard
                key={listing.id}
                href={listing.website ?? "#"}
                title={listing.name}
                summary={listing.description ?? ""}
                tag={listing.type.replace("_", " ")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
