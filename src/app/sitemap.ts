import type { MetadataRoute } from "next";
import { GATHERINGS } from "@/data/gatherings";
import { TEAMS } from "@/data/teams";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/privacy"];
  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p) })),
    ...GATHERINGS.map((g) => ({ url: absoluteUrl(`/gatherings/${g.id}`) })),
    ...TEAMS.map((t) => ({ url: absoluteUrl(`/teams/${t.id}`) })),
  ];
}
