import { HeroSearch } from "@/components/home/HeroSearch";
import { StatsBar } from "@/components/home/StatsBar";
import { ModuleCards } from "@/components/home/ModuleCards";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { LatestArticles } from "@/components/home/LatestArticles";
import { listEquipmentCategories } from "@/lib/content/equipment";
import { listMethodCategories } from "@/lib/content/methods";
import { listPublishedArticles } from "@/lib/content/articles";
import { getSiteStats } from "@/lib/content/stats";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [equipmentCategories, methodCategories, articles, stats] = await Promise.all([
    listEquipmentCategories(),
    listMethodCategories(),
    listPublishedArticles(3),
    getSiteStats(),
  ]);

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-[#0b0d14]">
      <HeroSearch />
      <StatsBar stats={stats} />
      <ModuleCards />
      <div className="mx-auto h-px w-full max-w-6xl bg-slate-900/[0.06] dark:bg-white/10" />
      <FeaturedCategories title="Equipment & Instruments" basePath="/equipment" categories={equipmentCategories} />
      <FeaturedCategories title="Methods & Techniques" basePath="/methods" categories={methodCategories} />
      <LatestArticles articles={articles} />
    </div>
  );
}
