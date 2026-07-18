import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ItemCard({
  href,
  title,
  summary,
  tag,
}: {
  href: string;
  title: string;
  summary: string;
  tag?: string;
}) {
  return (
    <Card href={href}>
      {tag && (
        <div className="mb-2">
          <Badge tone="info">{tag}</Badge>
        </div>
      )}
      <p className="font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-violet-400">
        {title}
      </p>
      <p className="mt-1.5 line-clamp-2 text-sm text-slate-600 dark:text-white/55">{summary}</p>
    </Card>
  );
}
