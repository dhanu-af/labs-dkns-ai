import type { Prisma } from "@prisma/client";

interface ManufacturerEntry {
  name: string;
  models?: string[];
}

function parseManufacturers(value: Prisma.JsonValue): ManufacturerEntry[] {
  if (!Array.isArray(value)) return [];
  const entries: ManufacturerEntry[] = [];
  for (const item of value) {
    if (item && typeof item === "object" && !Array.isArray(item) && "name" in item && typeof item.name === "string") {
      const models = "models" in item && Array.isArray(item.models) ? item.models.filter((m): m is string => typeof m === "string") : undefined;
      entries.push({ name: item.name, models });
    }
  }
  return entries;
}

export function ManufacturerList({ manufacturers }: { manufacturers: Prisma.JsonValue }) {
  const entries = parseManufacturers(manufacturers);
  if (entries.length === 0) return null;

  return (
    <ul className="space-y-2">
      {entries.map((entry) => (
        <li key={entry.name} className="rounded-lg border border-black/10 p-3 dark:border-white/10">
          <p className="font-medium">{entry.name}</p>
          {entry.models && entry.models.length > 0 && (
            <p className="mt-0.5 text-sm text-black/60 dark:text-white/60">{entry.models.join(", ")}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
