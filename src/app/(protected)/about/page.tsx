import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { siteName, siteTagline } from "@/lib/site-config";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">About {siteName}</h1>
      <p className="mt-4 text-slate-600 dark:text-white/70">{siteTagline}</p>
      <p className="mt-4 text-slate-600 dark:text-white/70">
        {siteName} is a reference hub for lab equipment, methods, SOPs, and lab management guidance — built to help
        analysts, lab managers, and technicians find accurate, practical information in one place.
      </p>

      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">About Nanduni</h2>
        <Card className="mt-4 sm:flex-row sm:gap-6">
          <div className="mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-slate-900/[0.07] sm:mx-0 dark:border-white/10">
            <Image
              src="/team/nanduni-gamage.jpg"
              alt="Nanduni Gamage"
              width={320}
              height={320}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="mt-5 sm:mt-0">
            <p className="font-semibold text-slate-900 dark:text-white">Nanduni Gamage</p>
            <p className="text-sm text-slate-500 dark:text-white/50">Analytical Chemist</p>

            <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/80">
              Nanduni Gamage is an Analytical Chemist with expertise in analytical testing, laboratory operations,
              quality management, and scientific research. She holds a Master of Science in Chemistry from Flinders
              University, Australia, and has experience working in both research and pharmaceutical laboratory
              environments.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-white/80">
              Throughout her career, Nanduni has worked with advanced analytical instruments including HPLC, LC-MS,
              FT-IR, GC-MS, NMR, and UV-Visible Spectroscopy. Her expertise includes laboratory quality control,
              equipment calibration, method development, data analysis, and ensuring compliance with GMP, GLP, and
              regulatory standards.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-white/80">
              At {siteName}, Nanduni is committed to sharing practical laboratory knowledge and supporting scientists,
              analysts, and laboratory professionals with reliable technical resources. Her goal is to make complex
              laboratory concepts easier to understand through clear guidance, practical SOPs, analytical methods, and
              educational content that helps laboratories improve quality, efficiency, and compliance.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-white/80">
              Driven by a passion for science and continuous learning, she believes that accurate knowledge,
              standardized practices, and accessible education are essential to advancing laboratory excellence and
              innovation.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
