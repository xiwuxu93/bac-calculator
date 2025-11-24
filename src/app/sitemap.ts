import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", changeFreq: "weekly" as const, priority: 1.0 },
    { path: "/bac-time-to-zero-calculator", changeFreq: "weekly" as const, priority: 0.8 },
    { path: "/how-to-calculate-bac", changeFreq: "weekly" as const, priority: 0.8 },
    { path: "/most-accurate-bac-calculator", changeFreq: "weekly" as const, priority: 0.8 },
    { path: "/bac-calculator-uk", changeFreq: "weekly" as const, priority: 0.7 },
    { path: "/bac-calculator-australia", changeFreq: "weekly" as const, priority: 0.7 },
    { path: "/bac-calculator-nz", changeFreq: "weekly" as const, priority: 0.7 },
    { path: "/bac-calculator-maroc", changeFreq: "weekly" as const, priority: 0.6 },
    { path: "/bac-calculator-dz", changeFreq: "weekly" as const, priority: 0.6 },
    { path: "/promille-to-bac", changeFreq: "monthly" as const, priority: 0.6 },
    { path: "/mgdl-to-bac", changeFreq: "monthly" as const, priority: 0.6 },
    { path: "/bac-conversion-calculator", changeFreq: "monthly" as const, priority: 0.6 },
    { path: "/are-bac-calculators-accurate", changeFreq: "monthly" as const, priority: 0.6 },
    { path: "/about", changeFreq: "yearly" as const, priority: 0.4 },
    { path: "/privacy", changeFreq: "yearly" as const, priority: 0.3 },
    { path: "/terms", changeFreq: "yearly" as const, priority: 0.3 },
    { path: "/disclaimer", changeFreq: "yearly" as const, priority: 0.3 },
  ] as const;

  return locales.flatMap((locale) => {
    const localePrefix = locale === defaultLocale ? "" : `/${locale}`;

    return routes.map((route) => ({
      url: `${SITE_URL}${localePrefix}${route.path === "/" ? "" : route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFreq,
      priority:
        route.path === "/"
          ? locale === defaultLocale
            ? route.priority
            : 0.8
          : route.priority,
    }));
  });
}
