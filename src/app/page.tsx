import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { LatestArticles } from "@/components/home/LatestArticles";
import { listEquipmentCategories } from "@/lib/content/equipment";
import { listMethodCategories } from "@/lib/content/methods";
import { listPublishedArticles } from "@/lib/content/articles";

export default async function Home() {
  const [equipmentCategories, methodCategories, articles] = await Promise.all([
    listEquipmentCategories(),
    listMethodCategories(),
    listPublishedArticles(3),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSearch />
      <FeaturedCategories title="Equipment & Instruments" basePath="/equipment" categories={equipmentCategories} />
      <FeaturedCategories title="Methods & Techniques" basePath="/methods" categories={methodCategories} />
      <LatestArticles articles={articles} />
    </div>
  );
}
