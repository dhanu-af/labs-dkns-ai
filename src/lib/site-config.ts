export type Phase = 1 | 2 | 3;

export interface NavItem {
  label: string;
  href: string;
  phase: Phase;
  description: string;
  /** Show a mega-menu dropdown with live category data instead of a flat link. */
  megaMenu?: boolean;
}

// Single source of truth for primary navigation, the footer, and the
// auto-generated /sitemap page. Matches the top-level sections from the
// labs.dkns.ai sitemap. `phase` tracks the build-priority notes so stub
// routes can say what's coming without needing new pages later.
export const primaryNav: NavItem[] = [
  { label: "Equipment", href: "/equipment", phase: 1, description: "Analytical instruments and general lab equipment", megaMenu: true },
  { label: "Methods", href: "/methods", phase: 1, description: "Chemical, instrumental, biological, and physical testing methods", megaMenu: true },
  { label: "SOPs", href: "/sops", phase: 2, description: "Standard operating procedures library and templates" },
  { label: "Lab Management", href: "/lab-management", phase: 2, description: "Quality systems, operations, finance, and personnel" },
  { label: "Safety & Compliance", href: "/safety", phase: 1, description: "General lab safety, regulatory standards, waste management" },
  { label: "Resources", href: "/resources", phase: 1, description: "Converters, calculators, glossary, templates, standards library" },
  { label: "Ask Nanduni", href: "/ask-nanduni", phase: 1, description: "Ask Nanduni AI — instant answers on methods, equipment, calibration, and compliance" },
  { label: "Blog", href: "/blog", phase: 3, description: "Industry trends, new equipment, regulatory updates, case studies" },
  { label: "Directory", href: "/directory", phase: 3, description: "Manufacturers, testing bodies, and training providers" },
];

export interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Contribute", href: "/contribute" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "Newsletter", href: "/newsletter" },
];

export const siteName = "DKNS Labs";
export const siteTagline = "Your Complete Laboratory Knowledge & Management Platform.";
